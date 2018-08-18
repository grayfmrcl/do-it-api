const User = require("../models/user");
const { genAuthToken } = require("../helpers/auth_helper");

module.exports = {
  signUp: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      res.status(400).json({ message: `email is required` });
    }
    if (!password) {
      res.status(400).json({ message: `password is required` });
    }

    if (email && password) {
      const user = new User();
      user.local.email = req.body.email;
      user.local.password = req.body.password;
      user.local.name = req.body.name;
      user
        .save()
        .then(new_user => {
          res.status(201).json({
            id: new_user._id,
            email: new_user.local.email,
            name: new_user.local.name
          });
        })
        .catch(err => next(err));
    }
  },
  signIn: (req, res, next) => {
    User.findByEmail(req.body.email)
      .then(user => {
        if (user && user.validPassword(req.body.password)) {
          genAuthToken(user, req, res, next);
        } else {
          res.status(400).json({ message: `incorrect email/password` });
        }
      })
      .catch(err => next(err));
  }
};