const router = require('express').Router()

const auth = require('./auth_router')
const user = require('./user_router')

const { authorize } = require('../middlewares/auth')


router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'connected' })
})

router.use('/auth', auth)
router.use('/user', authorize(), user)

module.exports = router
