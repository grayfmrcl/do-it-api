const LocalStrategy = require("passport-local").Strategy

const User = require("../models/user")

module.exports = {
  signin: new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findByEmail(email)
        .then(user => {
          if (!user || !user.validPassword(password)) {
            done(null, false, { message: `invalid email/password` })
          }
          else { done(null, user, { message: `login success` }) }
        })
        .catch(err => done(err))
    }
  ),

  signup: new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      process.nextTick(() => {
        if (!req.user) {
          User.findByEmail(email)
            .then(user => {
              if (user) {
                done(null, false, { message: 'email is already registered' })
              } else {
                let user = new User()
                user.local.name = req.body.name
                user.local.email = email
                user.local.password = password
                user.save()
                  .then(new_user => done(null, new_user, { message: `user registered successfully` }))
                  .catch(err => done(err))
              }
            })
            .catch(err => done(err))
        } else {
          //NOT TESTED
          console.log('>>>2')
          var user = req.user // pull the user out of the session
          // update the current users local credentials
          user.local.email = email
          user.local.password = user.password
          // save modifications to user
          user.save(function (err) {
            if (err) { return done(err) }
            return done(null, user)
          })
        }
      })
    })
}