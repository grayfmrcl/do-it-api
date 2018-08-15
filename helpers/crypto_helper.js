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

module.exports = { genRandomString, hashString }