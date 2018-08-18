const router = require('express').Router()

const tasks = require('./task_router')

const { signUp, signInLocal, signInFacebook } = require('../controllers/auth_controller')

router.post('/signup', signUp)
router.post('/signin', signInLocal)
router.post('/facebook', signInFacebook)

module.exports = router