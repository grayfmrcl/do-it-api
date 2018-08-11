const User = require('../models/user')
const { hashString } = require('../helpers/crypto_helper')
const { genAuthToken } = require('../helpers/auth_helper')

const signUp = (req, res, next) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            res.status(201)
                .json({ id: user._id, email: user.email })
        })
        .catch(err => next(err))
}

const signIn = (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(user => {
            if (user && user.password === hashString(req.body.password, user.password_salt)) {
                genAuthToken({ id: user._id }, (err, token) => {
                    if (err) { next() }
                    else { res.status(200).json({ id: user._id, auth_token: token }) }
                })
            } else { res.status(400).json({ message: `incorrect email/password` }) }
        })
}

module.exports = {
    signUp,
    signIn
}