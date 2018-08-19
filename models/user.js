const mongoose = require('mongoose')

const { genRandomString, hashString } = require('../helpers/crypto_helper')

const userSchema = new mongoose.Schema({
    local: {
        name: String,
        email: {
            type: String,
            index: true,
            unique: true,
            sparse: true,
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
        id: String,
        name: String,
        email: String
    },
    google: {
        id: String,
        name: String,
        email: String,
        picture: String
    }
})

userSchema.pre('save', function (next) {
    if (this.isNew && this.local.password) {
        this.local.password_salt = genRandomString(10)
        this.local.password = hashString(this.local.password, this.local.password_salt)
    }
    next()
})

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ 'local.email': email })
}

userSchema.methods.validPassword = function (password) {
    return this.local.password === hashString(password, this.local.password_salt)
}

userSchema.methods.getProfile = function () {
    return {
        id: this._id,
        name: this.local.name,
        email: this.local.email,
        facebook: this.facebook
    }
}

userSchema.methods.setFacebookInfo = function (profile) {
    this.facebook.id = profile.id
    this.facebook.name = profile.name
    this.facebook.email = profile.email

    return this.save()
}

userSchema.methods.setGoogleInfo = function (profile) {
    this.google.id = profile.id
    this.google.name = profile.name
    this.google.email = profile.email
    this.google.picture = profile.picture

    return this.save()
}

module.exports = mongoose.model('User', userSchema)