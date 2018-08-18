const router = require('express').Router()

const auth = require('./auth_router')
const user = require('./user_router')

const { bearerAuth } = require('../helpers/auth_helper')

const authorized = (req, res, next) => {
    bearerAuth(req, (err, decoded) => {
        if (err) {
            res.status(401).json({
                error: `you are unauthorized to make this request`
            })
        }
        else {
            req.user = { id: decoded.id, name: decoded.name }
            next()
        }
    })
}


router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'connected' })
})

router.use('/auth', auth)
router.use('/user', authorized, user)

module.exports = router
