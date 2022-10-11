const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const isExpert = req.body.isExpert;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
        status: "I am new",
        isExpert: isExpert,
        posts: [],
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);
  console.log(password);
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        console.log("auth is wrong!");
        const error = new Error("A user with this email coudl not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEuqal) => {
      if (!isEuqal) {
        const error = new Error("Wrong passworld!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.emai,
          userId: loadedUser._id.toString(),
        },
        "somesupersecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        isExpert: loadedUser.isExpert,
        email: loadedUser.email,
        name: loadedUser.name,
      });
    })
    .catch((err) => {
      res.status(422).json({
        message: "Authorization failed!",
      });
    });
};
