const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { hashPassword } = require('../helpers/auth_helper')

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
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

userSchema.pre('save', function (next) {
    let hash = hashPassword(this.password)
    this.salt = hash.salt
    this.password = hash.hashed_password

    next()
})

userSchema.plugin(uniqueValidator, { message: '{PATH} is already registered' });

module.exports = mongoose.model('User', userSchema)