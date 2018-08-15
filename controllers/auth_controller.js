const http = require('request-promise-native')

const User = require('../models/user')
const { genAuthToken } = require('../helpers/auth_helper')

const signUp = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email) { res.status(400).json({ message: `email is required` }) }
    if (!password) { res.status(400).json({ message: `password is required` }) }

    if (email && password) {
        const user = new User()
        user.local.email = req.body.email
        user.local.password = req.body.password
        user.local.name = req.body.name
        user.save()
            .then(new_user => {
                res.status(201).json({
                    id: new_user._id,
                    email: new_user.local.email,
                    name: new_user.local.name
                })
            })
            .catch(err => next(err))
    }
}

const signInLocal = (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(user => {
            if (user && user.validPassword(req.body.password)) {
                genAuthToken(user, req, res, next)
            } else {
                res.status(400).json({ message: `incorrect email/password` })
            }
        })
        .catch(err => next(err))
}

const signInFacebook = (req, res, next) => {
    http({ url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.accessToken}`, json: true })
        .then(user_profile => {
            User.findOne({ 'facebook.id': user_profile.id })
                .then(user => {
                    if (user) { genAuthToken(user, req, res, next) }
                    else {
                        const new_user = new User
                        new_user.facebook.connected = true
                        new_user.facebook.id = user_profile.id
                        new_user.facebook.email = user_profile.email

                        new_user.save()
                            .then(new_user => { genAuthToken(new_user, req, res, next) })
                            .catch(err => next(err))
                    }
                })
                .catch(err => next(err))
        })
        .catch(err => {
            if (err.statusCode == 400) {
                res.status(400).json({ message: err.message })
            }
            else { next(err) }
        })
}

module.exports = {
    signUp,
    signInLocal,
    signInFacebook
}