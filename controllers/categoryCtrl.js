/**
 * Controller providing dog breed related control
 * @module controllers/categoryCtrl
 * @requires models/categoryModel
 * @requires models/dogModel
 */
const Category = require('../models/categoryModel')
const Dogs = require('../models/dogModel')
 
/**
 * Breed Category Controller
 * @name categoryCtrl
 * @property {{getCategories}} Get action
 * @property {{createCategory}} Create action
 * @property {{deleteCategory}} Delete action
 * @property {{updateCategory}} Updatae action
 */
const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists."})
            /**
             * New Category
             * @type {{name:String}}
             */
            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Created a new breed"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const dogs = await Dogs.findOne({category: req.params.id})
            if(dogs) return res.status(400).json({
                msg: "Please delete all dogs with a relationship."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl