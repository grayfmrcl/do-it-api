const router = require('express').Router()

const { register } = require('../controllers/auth_controller')

router.post('/register', register)

module.exports = router