const passport = require('passport')

const User = require('../models/user')

const local = require('./local')
const jwt_bearer = require('./jwt_bearer')
const facebook = require('./facebook')
const google = require('./google')

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(user => done(null, user))
//     .catch(err => done(err))
// })

passport.use('local-signup', local.signup)
passport.use('local-signin', local.signin)
passport.use('jwt-bearer', jwt_bearer)
passport.use('facebook', facebook)
passport.use('google', google)

module.exports = passport