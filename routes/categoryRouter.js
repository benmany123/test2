/**
 * Express router providing dog breeds related routers
 * @module routes/categoryRouter
 * @requires express
 * @requires controllers/categoryCtrl
 * @requires middleware/auth
 * @requires middleware/authAdmin
 */
const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

 /**
  * @swagger
  * tags:
  *   name: categoryRouter
  *   description: The categories managing API
  */
/**
 * Router serving breeds category
 * @name /category
 * @property {getCategories}
 * @property {createCategory}
 */
router.route('/category')
/**
  * @swagger
  * /category:
  *     get:
  *         summary: Get the dog breeds category
  *         tags: [categoryRouter]
  *         responses:
  *             200:
  *                 description: Get the list of the dog breeds category
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Category'
  */
    .get(categoryCtrl.getCategories)
/**
  * @swagger
  * /category:
  *     post:
  *         summary: Post the dog breeds category
  *         tags: [categoryRouter]
  *         responses:
  *             200:
  *                 description: Post the list of the dog breeds category
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Category'
  */  
    .post(auth, authAdmin, categoryCtrl.createCategory)

/**
 * Router serving breeds category
 * @name /category/:id
 * @property {deleteCategory}
 * @property {updateCategory}
 */
router.route('/category/:id')
/**
  * @swagger
  * /category/{id}:
  *     delete:
  *         summary: Delete the dog breeds category
  *         tags: [categoryRouter]
  *         responses:
  *             200:
  *                 description: Delete the list of the dog breeds category
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Category'
  */  
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
/**
  * @swagger
  * /category/{id}:
  *     put:
  *         summary: Put the dog breeds category
  *         tags: [categoryRouter]
  *         responses:
  *             200:
  *                 description: Update the list of the dog breeds category
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Category'
  */ 
    .put(auth, authAdmin, categoryCtrl.updateCategory)

module.exports = router