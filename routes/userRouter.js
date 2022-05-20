/**
 * Express router providing user account related routers
 * @module routes/upload
 * @requires express
 * @requires controllers/userCtrl
 * @requires middleware/auth
 */
const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

 /**
  * @swagger
  * tags:
  *   name: userRouter
  *   description: The user account managing API
  */
/**
 * Router serving user register
 * @name /register
 * @property {register}
 */
/**
  * @swagger
  * /register:
  *     post:
  *         summary: Register the user account
  *         tags: [userRouter]
  *         responses:
  *             200:
  *                 description: Register the user account
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/User'
  */  
router.post('/register', userCtrl.register)

/**
 * Router serving user login
 * @name /login
 * @property {login}
 */
/**
  * @swagger
  * /login:
  *     post:
  *         summary: Login the user account
  *         tags: [userRouter]
  *         responses:
  *             200:
  *                 description: Login the user account
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/User'
  */  
router.post('/login', userCtrl.login)

/**
 * Router serving user logout
 * @name /logout
 * @property {logout}
 */
/**
  * @swagger
  * /logout:
  *     post:
  *         summary: Logut the user account
  *         tags: [userRouter]
  *         responses:
  *             200:
  *                 description: Logut the user account
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/User'
  */
router.get('/logout', userCtrl.logout)

/**
 * Router serving refreshToken
 * @name /refreshToken
 * @property {refreshToken}
 */
/**
  * @swagger
  * /refresh_token:
  *     post:
  *         summary: Get the user account refresh token
  *         tags: [userRouter]
  *         responses:
  *             200:
  *                 description: Get the user account refresh token
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/User'
  */
router.get('/refresh_token', userCtrl.refreshToken)

/**
 * Router serving user information
 * @name /infor
 * @property {getUser}
 */
/**
  * @swagger
  * /infor:
  *     post:
  *         summary: Get the user account information
  *         tags: [userRouter]
  *         responses:
  *             200:
  *                 description: Get the user account information
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/User'
  */
router.get('/infor', auth,  userCtrl.getUser)

/**
 * Router serving user add item to favourite list
 * @name /addCart
 * @property {addCart}
 */
/**
  * @swagger
  * /addcart:
  *     post:
  *         summary: Post the user favourite dog to cart list
  *         tags: [userRouter]
  *         responses:
  *             200:
  *                 description: Post the user favourite dog to cart list
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/User'
  */
router.patch('/addcart', auth, userCtrl.addCart)

module.exports = router