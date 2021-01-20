const { User, validate, validatePassword } = require("../model/user");

const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function signup(req, res, next) {
  const { error } = validate(req.fields);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: error.details[0].message });
  }

  let userExist = await User.findOne({ email: req.fields.email });
  if (userExist) {
    return res
      .status(400)
      .send({ status: 400, message: "this E-mail is already in use!" });
  }
  bcrypt
    .hash(req.fields.password, 10)
    .then(hash => {
      const user = new User({
        email: req.fields.email,
        password: hash,
        full_name: req.fields.full_name
      });

      user
        .save()
        .then(() =>
          res.status(201).json({ status: 200, message: "user created!" })
        )
        .catch(error =>
          res.status(400).json({ status: 400, message: error.message })
        );
    })
    .catch(error =>
      res.status(500).json({ status: 500, message: error.message })
    );
}

exports.signup = signup;


exports.login = (req, res, next) => {
  User.findOne({ email: req.fields.email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ status: 404, message: "User not found !" });
      }
      bcrypt
        .compare(req.fields.password, user.password)
        .then(valid => {
          if (!valid) {
            return res
              .status(400)
              .json({ status: 400, message: "Wrong Password !" });
          }
          else {
            res.status(200).json({
              status: 200,
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "1440h"
              }),
              full_name: user.full_name,
            });
          }
        })
        .catch(error =>
          res.status(500).json({ status: 500, message: error.message })
        );
    })
    .catch(error =>
      res.status(500).json({ status: 500, message: error.message })
    );
};