const User = require('../models/user')

const register = (req, res, next) => {
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

module.exports = {
    register
}