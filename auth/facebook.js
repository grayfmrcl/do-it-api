const User = require("../models/user");

const oauth = require("../helpers/oauth_helper");
const { genAuthToken, bearerAuth } = require("../helpers/auth_helper");

module.exports = (req, res, next) => {
  oauth
    .facebook(req.body.accessToken)
    .then(fb_profile => {
      bearerAuth(req, (err, user) => {
        if (err) {
          User.findOne({ "facebook.id": fb_profile.id })
            .then(user => {
              if (user) {
                genAuthToken(user, req, res, next);
              } else {
                const new_user = new User();
                new_user.facebook.id = fb_profile.id;
                new_user.facebook.name = fb_profile.name;
                new_user.facebook.email = fb_profile.email;

                new_user
                  .save()
                  .then(new_user => {
                    genAuthToken(new_user, req, res, next);
                  })
                  .catch(err => next(err));
              }
            })
            .catch(err => next(err));
        } else {
          User.findOneAndUpdate(
            { _id: user.id },
            {
              "facebook.id": fb_profile.id,
              "facebook.name": fb_profile.name,
              "facebook.email": fb_profile.email
            }
          )
            .then(_user => {
              res.status(200).json(_user.getProfile());
            })
            .catch(err => next(err));
        }
      });
    })
    .catch(err => {
      if (err.statusCode == 400) {
        console.log(err.message);
        res.status(400).message(`authentication failed`);
      }
    });
};
