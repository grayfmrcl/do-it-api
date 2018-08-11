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

const genAuthToken = (user, callback) => {
    return jwt.sign(user, process.env.JWT_SECRET, callback)
}

module.exports = { bearerAuth, genAuthToken }

