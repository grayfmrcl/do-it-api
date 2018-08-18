const User = require('../models/user')

const getProfile = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => {
            if (user) {
                res.status(200).json(user.getProfile())
            } else { next() }

        })
        .catch(err => next(err))
}

module.exports = {
    getProfile
}