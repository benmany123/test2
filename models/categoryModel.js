/**
 * Category Model
 * @module models/categoryModel
 * @requires mongoose
 */
const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         category:
 *           type: string
 *           description: The dog breed category
 *       example:
 *         id: 62760cdeff692316bce285ec
 *         category: Pug
 */
/**
 * Breed category Schema 
 * @type {name: String}
*/
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)