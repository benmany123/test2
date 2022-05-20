/**
 * Dog Model
 * @module models/dogModel
 * @requires mongoose
 */
const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Dog:
 *       type: object
 *       required:
 *         - dog_id
 *         - title
 *         - content
 *         - images
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the dog
 *         dog_id:
 *           type: string
 *           description: The dog id for organization use
 *         title:
 *           type: string
 *           description: The dog name
 *         content:
 *           type: string
 *           description: The dog gender
 *         images:
 *           type: object
 *           description: The dog image
 *         category:
 *           type: string
 *           description: The dog breed category
 *       example:
 *         id: 62760d47ff692316bce285f5
 *         dog_id: 0001
 *         title: tom
 *         content: M
 *         images: https://res.cloudinary.com/benmany123/image/upload/v1651903778/test/medzftbjg7cxwukbh5f3.jpg
 *         category: Pug
 */
/**
 * Dog Information Schema 
 * @type {dog_id:String, title:String, age:Number, description:String, content:String, images:Object, category:String, checked:Boolean}
*/
const dogSchema = new mongoose.Schema({
    dog_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    age:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("dogs", dogSchema)