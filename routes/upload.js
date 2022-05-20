/**
 * Express router providing dog image related routers
 * @module routes/upload
 * @requires express
 * @requires cloudinary
 * @requires middleware/auth
 * @requires middleware/authAdmin
 * @requires fs
 */
const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

/**
 * Image will upload on cloudinary
 * @param cloud_name
 * @param api_key
 * @param api_secret
 */
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

 /**
  * @swagger
  * tags:
  *   name: upload
  *   description: The image upload managing API
  */
/**
 * Only admin can upload image
 * @name /upload
 * @property {post}
 */
/**
  * @swagger
  * /upload:
  *     post:
  *         summary: Upload the dog image
  *         tags: [upload]
  *         responses:
  *             200:
  *                 description: Upload the dog image
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Dog'
  */  
router.post('/upload',auth , authAdmin, (req, res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

/**
 * Only admin can delete image
 * @name /upload
 * @property {post}
 */
/**
  * @swagger
  * /destroy:
  *     post:
  *         summary: Delete the dog image
  *         tags: [upload]
  *         responses:
  *             200:
  *                 description: Delete the dog image
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Dog'
  */ 
router.post('/destroy',auth , authAdmin, (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})


const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router