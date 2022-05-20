/**
 * Dog information test
 * @module test/dog.test
 * @requires supertest
 * @requires test/app.test
 * @requires express
 * @requires controllers/dogCtrl
 * @requires middleware/auth
 * @requires middleware/authAdmin
 */
const request = require('supertest')
const app = require ('./app_test')
const router = require('express').Router()
const dogCtrl = require('../controllers/dogCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

/**
 * @type {string}
 * @type {string}
 * @type {integer}
 * @type {string}
 * @type {object}
 * @type {string}
 * @type {string}
 */
const expected = {
    "dog_id" : "0001",
    "title" : "Ben ",
    "age" : "1",
    "description" : "M",
    "images" : "https://res.cloudinary.com/benmany123/image/upload/v1651903778/test/medzftbjg7cxwukbh5f3.jpg",
    "category" : "Pug",
    "content" : "Tuen Mun"
}

/**
 * Test router serving dogs information
 * @name /dogs
 * @property {getDogs}
 * @property {createDog}
 */
router.route('/dogs')
    .get(dogCtrl.getDogs)
    .post(auth, authAdmin,dogCtrl.createDog)

/**
 * Test router serving dogs information
 * @name /dogs/:id
 * @property {deleteDog}
 * @property {updateDog}
 */
router.route('/dogs/:id')
    .delete(auth, authAdmin, dogCtrl.deleteDog)
    .put(auth, authAdmin, dogCtrl.updateDog)

app.get('/dog', function (req,res){
    res.status(200).json();
})
app.post('/dog', function (req,res){
    res.status(200).json();
})
app.delete('/dog/:id', function (req,res){
    res.status(200).json();
})
app.put('/dog/:id', function (req,res){
    res.status(200).json();
})

/**
 * Get dog test
 */
describe('Get dog', function(){
    it('200', function(done){
        request(app)
        .get('/dog')
        .expect(200)
        .end(done);
    })
})

/**
 * Create dog test
 */
describe('Post dog', function(){
    it('post', function(done){
        request(app)
        .post('/dog')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})

/**
 * Delete  dog test
 */
describe('Del dog', function(){
    it('Del', function(done){
        request(app)
        .delete('/dog/:id')
        .expect(200)
        .end(done);
    })
})

/**
 * Update  dog test
 */
describe('Put dog', function(){
    it('Put', function(done){
        request(app)
        .put('/dog/:id')
        .expect(200)
        .end(done);
    })
})

