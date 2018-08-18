const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { genRandomString, hashString } = require('../helpers/crypto_helper')

const userSchema = new mongoose.Schema({
    local: {
        name: String,
        email: {
            type: String,
            unique: true,
            validate: {
                validator: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
                message: `invalid email`
            }
        },
        password: {
            type: String,
            validate: {
                validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value),
                message: `password have to be at least 8 character with 1 lowercase character, 1 uppercase character, and 1 number`
            }
        },
        password_salt: { type: String }
    },
    facebook: {
        connected: { type: Boolean, default: false },
        id: String,
        name: String,
        email: String
    }
})

userSchema.plugin(uniqueValidator, { message: '{PATH} is already registered' });

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ 'local.email': email })
}

userSchema.methods.validPassword = function (password) {
    return this.local.password === hashString(password, this.local.password_salt)
}

userSchema.pre('save', function (next) {
    if (this.local.password) {
        this.local.password_salt = genRandomString(10)
        this.local.password = hashString(this.local.password, this.local.password_salt)
    }
    next()
})

module.exports = mongoose.model('User', userSchema)