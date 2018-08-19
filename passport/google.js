const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const User = require('../models/user')

const setGoogleInfoHandler = (user, profile, done) => {
  user.setGoogleInfo(profile)
    .then(user => done(null, user))
    .catch(err => done(err))
}

module.exports = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URL,
  passReqToCallback: true
},
  function (req, accessToken, refreshToken, profile, done) {
    const mapProfile = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value
    }

    if (!req.user) {
      User.findOne({ "google.id": profile.id })
        .then(user => {
          if (user) {
            setGoogleInfoHandler(user, mapProfile, done)
          } else {
            let new_user = new User()
            setGoogleInfoHandler(new_user, mapProfile, done)
          }
        })
        .catch(err => done(err));
    } else {
      //HANDLE IF USER HAS SIGNED IN
    }
  }
)