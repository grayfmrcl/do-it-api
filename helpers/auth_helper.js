const jwt = require('jsonwebtoken')

const bearerAuth = (req, callback) => {
    const authHeader = req.headers['authorization'] || ' '
    const token = authHeader.split(' ')
    if (token[0] != 'Bearer') { callback(new Error(`invalid token`)) }
    else {
        jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
            callback(err, decoded)
        })
    }
}

const genAuthToken = (user, req, res, next) => {
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, (err, token) => {
        if (err) { next() }
        else {
            res.status(200)
                .json({
                    message: 'success',
                    auth_token: token
                })
        }
    })
}

module.exports = { bearerAuth, genAuthToken }

