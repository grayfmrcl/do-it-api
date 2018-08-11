const crypto = require('crypto')

const genRandomString = (length) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
}

const hashString = function (value, salt) {
    return crypto
        .createHmac('md5', salt)
        .update(value)
        .digest('hex')
}

const hashPassword = function (password) {
    let salt = genRandomString(7)
    let hashed_password = hashString(password, salt)
    return { salt, hashed_password }
}

module.exports = {
    hashPassword
}





