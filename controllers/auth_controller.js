const User = require('../models/user')
const { hashString } = require('../helpers/crypto_helper')
const { genAuthToken } = require('../helpers/auth_helper')

const signUp = (req, res, next) => {
    const user = new User()
    user.email = req.body.email
    user.password = req.body.password
    user.name = req.body.name
    user.save()
        .then(new_user => {
            res.status(201)
                .json({ id: new_user._id, email: new_user.email, name: new_user.name })
        })
        .catch(err => next(err))
}

const signIn = (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(user => {
            if (user && user.password === hashString(req.body.password, user.password_salt)) {
                genAuthToken({ id: user._id }, (err, token) => {
                    if (err) { next() }
                    else { 
                        res.status(200)
                            .json({ 
                                id: user._id, 
                                name: user.name,
                                auth_token: token 
                            }) 
                    }
                })
            } else { res.status(400).json({ message: `incorrect email/password` }) }
        })
}

module.exports = {
    signUp,
    signIn
}