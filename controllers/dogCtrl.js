/**
 * Controller providing dog information related control
 * @module controllers/dogCtrl
 * @requires models/dogModel
 */
const Dogs = require('../models/dogModel')

/**
 * API class for filtering and sorting
 * @class 
 */
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    /**
     * Filtering method
     * @returns filtering results
     */
    filtering(){
       const queryObj = {...this.queryString}

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
    /**
     * Sorting method
     * @returns sorting results
     */
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    /**
     * Paginating method
     * @returns paginating results
     */
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

/**
 * Dog information Controller
 * @property {{getDogs}} Get action
 * @property {{createDog}} Create action
 * @property {{deleteDog}} Delete action
 * @property {{updateDog}} Updatae action
 */
const dogCtrl = {
    getDogs: async(req, res) =>{
        try {
            const features = new APIfeatures(Dogs.find(), req.query)
            .filtering().sorting().paginating()

            const dogs = await features.query

            res.json({
                status: 'success',
                result: dogs.length,
                dogs: dogs
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createDog: async(req, res) =>{
        try {
            const {dog_id, title, age, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const dog = await Dogs.findOne({dog_id})
            if(dog)
                return res.status(400).json({msg: "This dog already exists."})

            const newDog = new Dogs({
                dog_id, title: title.toLowerCase(), age, description, content, images, category
            })

            await newDog.save()
            res.json({msg: "Created a dog"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteDog: async(req, res) =>{
        try {
            await Dogs.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Dog"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateDog: async(req, res) =>{
        try {
            const {title, age, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Dogs.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), age, description, content, images, category
            })

            res.json({msg: "Updated a Dog"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = dogCtrl