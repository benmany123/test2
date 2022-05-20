/**
 * AuthAdmin
 * @module middleware/auth
 * @requires models/userModel
 */
const Users = require('../models/userModel')

/**
 * AuthAdmin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Admin checking result
 */
const authAdmin = async (req, res, next) =>{
    try {
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({msg: "Admin resources access denied"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin