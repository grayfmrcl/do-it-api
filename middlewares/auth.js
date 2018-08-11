const { bearerAuth } = require('../helpers/auth_helper')

const authorize = () => {
    return (req, res, next) => {
        bearerAuth(req, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: `You are unauthorized to make this request.`
                })
            }
            else {
                req.user = { id: decoded.id, name: decoded.name }
                next()
            }
        })
    }
}

module.exports = { authorize }