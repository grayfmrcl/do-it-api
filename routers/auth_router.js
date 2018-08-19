const router = require('express').Router()

const passport = require('../passport')

const { genAuthToken } = require('../helpers/auth_helper')

router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) { next(err) }
    if (!user) {
      res.status(400).json({ message: info.message })
    }
    res.status(201).json({
      message: info.message,
      data: user.getProfile()
    })
  })(req, res, next)
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    if (err) { next(err) }
    if (!user) {
      res.status(400).json({ message: info.message })
    }

    req.login(user, { session: false }, err => {
      if (err) next(err)
    })

    genAuthToken(user, req, res, next)
  })(req, res, next)
})

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))
router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    if (err) next(err)
    else {
      res.status(200).json({
        data: user.facebook
      })
    }

  })(req, res, next)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) next(err)
    else {
      res.status(200).json(user)
    }

  })(req, res, next)
})

module.exports = router