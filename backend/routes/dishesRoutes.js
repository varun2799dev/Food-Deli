const express = require('express');

const router = express.Router()

const {sendDishes} = require('../controllers/dishesController')

/**
 * @openapi
 * /:
 *   get:
 *     description: This is the dishes api
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/dishes', sendDishes)

module.exports =router;
