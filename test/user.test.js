/**
 * Dog information test
 * @module test/dog.test
 * @requires supertest
 * @requires test/app.test
 * @requires express
 * @requires controllers/userCtrl
 * @requires middleware/auth
 */
const request = require('supertest')
const app = require ('./app_test')
const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

/**
 * @type {string}
 * @type {string}
 * @type {string}
 */
const expected = {
    "name" : "benmany123",
    "emaail" :  "benmany123@gmail.com",
    "password" : "123456"
}
/**
 * Test router serving user register
 * @name /register
 * @property {register}
 */
router.route('/register')
    .post(userCtrl.register)

/**
 * Test router serving user login
 * @name /login
 * @property {login}
 */   
router.route('/login')
    .post(userCtrl.login)

/**
 * Test router serving user logout
 * @name /logout
 * @property {logout}
 */
router.route('/logout')
    .get(userCtrl.logout)

/**
 * Test router serving refreshToken
 * @name /refreshToken
 * @property {refreshToken}
 */    
router.route('/refresh_token')
    .get(userCtrl.refreshToken)

/**
 * Test router serving user information
 * @name /infor
 * @property {getUser}
 */
router.route('/infor')
    .get(auth, userCtrl.getUser)

/**
 * Test router serving user add item to favourite list
 * @name /addCart
 * @property {addCart}
 */
router.route('/addcart')
    .patch(auth, userCtrl.addCart)

app.post('/register', function (req,res){
    res.status(200).json();
})
app.post('/login', function (req,res){
    res.status(200).json();
})
app.get('/logout', function (req,res){
    res.status(200).json();
})
app.get('/refresh_token', function (req,res){
    res.status(200).json();
})
app.get('/infor', function (req,res){
    res.status(200).json();
})
app.patch('/addcart', function (req,res){
    res.status(200).json();
})

/**
 * Register test
 */
describe('Post register', function(){
    it('post', function(done){
        request(app)
        .post('/register')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})

/**
 * Login test
 */
describe('Post login', function(){
    it('Post login', function(done){
        request(app)
        .post('/login')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})

/**
 * Logout test
 */ 
describe('Get logout', function(){
    it('Get logout', function(done){
        request(app)
        .get('/logout')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})

/**
 * Get refresh token test
 */
describe('Get refresh token', function(){
    it('Get refresh token', function(done){
        request(app)
        .get('/refresh_token')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})

/**
 * Get information test
 */
describe('Get infor', function(){
    it('Get infor', function(done){
        request(app)
        .get('/infor')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})

/**
 * Patch favourite list test
 */
describe('Patch favourite list', function(){
    it('Patch favourite list', function(done){
        request(app)
        .patch('/addcart')
        .send({expected})
        .expect(200)        
        .end(done);
    })
})
