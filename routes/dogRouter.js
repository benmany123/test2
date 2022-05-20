/**
 * Express router providing dog information related routers
 * @module routes/categoryRouter
 * @requires express
 * @requires middleware/auth
 * @requires middleware/authAdmin
 */
const router = require('express').Router()
const dogCtrl = require('../controllers/dogCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

 /**
  * @swagger
  * tags:
  *   name: dogRouter
  *   description: The dogs records managing API
  */
/**
 * Router serving dogs information
 * @name /dogs
 * @property {getDogs}
 * @property {createDog}
 */
router.route('/dogs')
/**
  * @swagger
  * /dogs:
  *     get:
  *         summary: Get the dog records
  *         tags: [dogRouter]
  *         responses:
  *             200:
  *                 description: Get the list of the dog records
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Dog'
  */
    .get(dogCtrl.getDogs)
/**
  * @swagger
  * /dogs:
  *     post:
  *         summary: Post the dog records
  *         tags: [dogRouter]
  *         responses:
  *             200:
  *                 description: Post the list of the dog records
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Dog'
  */
    .post(auth, authAdmin, dogCtrl.createDog)

/**
 * Router serving dogs information
 * @name /dogs/:id
 * @property {deleteDog}
 * @property {updateDog}
 */
router.route('/dogs/:id')
/**
  * @swagger
  * /dogs/{id}:
  *     delete:
  *         summary: Delete the dog records
  *         tags: [dogRouter]
  *         responses:
  *             200:
  *                 description: Delete the list of the dog records
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Dog'
  */ 
    .delete(auth, authAdmin, dogCtrl.deleteDog)
/**
  * @swagger
  * /dogs/{id}:
  *     put:
  *         summary: Put the dog records
  *         tags: [dogRouter]
  *         responses:
  *             200:
  *                 description: Update the list of the dog records
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Dog'
  */ 
    .put(auth, authAdmin, dogCtrl.updateDog)

module.exports = router