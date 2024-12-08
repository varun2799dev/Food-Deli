const express = require('express')
const createOrder = require('../controllers/OrdersController')

const router = express.Router()


router.post('/create-order',createOrder)

module.exports = router;
