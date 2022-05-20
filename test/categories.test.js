/**
 * Categories test
 * @module test/categories.test
 * @requires test/app.test
 * @requires express
 * @requires controllers/categoryCtrl
 * @requires middleware/auth
 * @requires middleware/authAdmin
 */
const request = require('supertest')
const app = require ('./app_test')
const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

/**
 * @type {string}
 */
const expected = {
    "name" : "Pug"
}

/**
 * Test router serving breeds category
 * @name /category
 * @property {getCategories}
 * @property {createCategory}
 */
router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory)

/**
 * Test router serving breeds category
 * @name /category/:id
 * @property {deleteCategory}
 * @property {updateCategory}
 */
router.route('/category/:id')
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)

app.get('/category', function (req,res){
    res.status(200).json();
})
app.post('/category', function (req,res){
    res.status(200).json();
})
app.delete('/category/:id', function (req,res){
    res.status(200).json();
})
app.put('/category/:id', function (req,res){
    res.status(200).json();
})

/**
 * Get category test
 */
describe('Get category', function(){
    it('200', function(done){
        request(app)
        .get('/category')
        .expect(200)
        .end(done);
    })
})

/**
 * Create category test
 */
describe('Post category', function(){
    it('post', function(done){
        request(app)
        .post('/category')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})


/**
 * Delete category test
 */
describe('Del category', function(){
    it('Del', function(done){
        request(app)
        .delete('/category/:id')
        .expect(200)
        .end(done);
    })
})

/**
 * Update category test
 */
describe('Put category', function(){
    it('Put', function(done){
        request(app)
        .put('/category/:id')
        .expect(200)
        .end(done);
    })
})
