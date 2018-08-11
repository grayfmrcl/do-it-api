const router = require('express').Router()

router.get('/api', (req, res, next) => {
    res.status(200).json({ message: 'connected' })
})

module.exports = router
