const router = require('express').Router()

const auth = require('./auth_router')
const tasks = require('./task_router')

const { authorize } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'connected' })
})

router.use('/auth', auth)
router.use('/tasks', authorize(), tasks)

module.exports = router
