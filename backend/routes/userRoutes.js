const express = require('express')
const {loginUser, signUpUser} = require('../controllers/userController')

const router = express.Router()
/**
 * @openapi
 * /api/login:
 *   post:
 *     description: This is the login API!
 *     responses:
 *       200:
 *         description: Login credentials.
 */

/**
 * @openapi
 * /api/signup:
 *   post:
 *     description: This is the Signup API!
 *     responses:
 *       200:
 *         description: Signup credentails needed.
 */

router.post('/login', loginUser)
router.post('/signup', signUpUser)

module.exports = router;
