/**
 * User Model
 * @module models/userModel
 * @requires mongoose
 */
const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *         - cart
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         role:
 *           type: number
 *           description: The user role (admin/user)
 *         cart:
 *           type: array
 *           description: The user favourite
 *       example:
 *         _id: 624f137458c15415d43d0c05
 *         name: user011112
 *         email: user011211@gmail.com
 *         password: $2b$10$hQcDfCame/I5y6ko3udykegQ4uMK8e3FE8pHID8LiA42va7fG2upy
 *         role: 0
 *         cart: 0
 */
/**
 * User account schema
 * @type {name: String, email:String, password:String, role:Number, cart:Array}
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)