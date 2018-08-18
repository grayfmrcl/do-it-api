const router = require('express').Router()

const tasks = require('./task_router')

const local = require('../auth/local')
const facebook = require('../auth/facebook')


router.post('/signup', local.signUp)
router.post('/signin', local.signIn)
router.post('/facebook', facebook)

module.exports = router