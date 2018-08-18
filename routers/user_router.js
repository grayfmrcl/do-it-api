const router = require('express').Router()

const { getProfile } = require('../controllers/user_controller')

const tasks = require('./task_router')

router.get('/', getProfile)
router.use('/tasks', tasks)

module.exports = router