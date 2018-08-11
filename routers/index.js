const router = require('express').Router()

const tasks = require('./task_router')

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'connected' })
})

router.use('/tasks', tasks)

module.exports = router
