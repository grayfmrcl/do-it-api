const router = require('express').Router()

const { getProfile, connectFacebook } = require('../controllers/user_controller')

const tasks = require('./task_router')

router.get('/', getProfile)
router.post('/connect/fb', connectFacebook)
router.use('/tasks', tasks)

module.exports = router