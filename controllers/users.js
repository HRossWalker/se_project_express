const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  errorSelector,
  CREATED,
  CustomError,
  INPUT_ERROR,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })

    .catch((err) => errorSelector(res, err));
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => errorSelector(res, err));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return Promise.reject(new CustomError("AssertionError"));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      console.log("");
      return User.create({ email, name, avatar, password: hash }).then(
        (newUser) => {
          const response = newUser.toObject();
          delete response.password;
          res.status(CREATED).send({ data: response });
        }
      );
    })
    .catch((err) => {
      errorSelector(res, err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(INPUT_ERROR)
      .send({ message: "The password and email fields are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      errorSelector(res, err);
    });
};

module.exports = {
  createUser,
  login,
  updateCurrentUser,
  getCurrentUser,
};
