const http = require('request-promise-native')

const User = require('../models/user')

const getProfile = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => {
            if (user) {
                res.status(200).json({
                    id: user.id,
                    local: { name: user.local.name, email: user.local.email },
                    facebook: user.facebook
                })
            } else { next() }

        })
        .catch(err => next(err))
}

const connectFacebook = (req, res, next) => {
    http({ url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.accessToken}`, json: true })
        .then(user_profile => {
            User.findByIdAndUpdate(req.user.id, {
                'facebook.connected': true,
                'facebook.id': user_profile.id,
                'facebook.email': user_profile.email
            })
                .then(() => res.status(200).json(user_profile))
                .catch(err => next(err))
        })
        .catch(err => next(err))
}

module.exports = {
    getProfile,
    connectFacebook
}