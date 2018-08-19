const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')

module.exports = new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
  (payload, done) => {
    User.findById(payload.id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })