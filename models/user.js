const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { genRandomString, hashString } = require('../helpers/crypto_helper')

const userSchema = new mongoose.Schema({
    name: { type: String, },
    email: {
        type: String,
        required: [true, `email is required`],
        unique: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: `email is invalid`
        }
    },
    password: {
        type: String,
        required: [true, `password is required`],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
            },
            message: `password have to be at least 8 character with 1 lowercase character, 1 uppercase character, and 1 number`
        }
    },
    password_salt: { type: String }
})

userSchema.plugin(uniqueValidator, { message: '{PATH} is already registered' });

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email })
}

userSchema.pre('save', function (next) {
    console.log(this)
    this.password_salt = genRandomString(7)
    this.password = hashString(this.password, this.password_salt)

    next()
})

module.exports = mongoose.model('User', userSchema)