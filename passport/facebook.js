const FacebookStrategy = require('passport-facebook').Strategy

const User = require("../models/user");

const setFacebookInfoHandler = (user, profile, done) => {
  user.setFacebookInfo(profile)
    .then(user => done(null, user))
    .catch(err => done(err))
}

module.exports = new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.FB_REDIRECT_URL,
  passReqToCallback: true
},
  (req, accessToken, refreshToken, profile, done) => {

    const mapProfile = {
      id: profile.id,
      name: profile.displayName,
      email: profile.email
    }

    if (!req.user) {
      User.findOne({ "facebook.id": profile.id })
        .then(user => {
          if (user) {
            setFacebookInfoHandler(user, mapProfile, done)
          } else {
            let new_user = new User()
            setFacebookInfoHandler(new_user, mapProfile, done)
          }
        })
        .catch(err => done(err));
    } else {
      //HANDLE IF USER HAS SIGNED IN
    }
  })
