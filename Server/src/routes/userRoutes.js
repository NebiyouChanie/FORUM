const express = require('express')
const router = express.Router()
const {register , login } = require('../controllers/userControllers')
const {validateUserRegstration,validateUserLogin} = require('../middlewares/userValidationMiddleware')


// REGISTRATION
router.post('/register',validateUserRegstration,register)


// LOGIN
router.post('/login',validateUserLogin,login)

module.exports = router