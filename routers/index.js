const router = require('express').Router()

const passport = require('../passport')

const auth = require('./auth_router')
const user = require('./user_router')

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'connected' })
})

router.use('/auth', auth)
router.use('/user', passport.authenticate('jwt-bearer', { session: false }), user)

module.exports = router
