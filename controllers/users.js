const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  errorSelector,
  CREATED,
  // UNAUTHORIZED_ERROR,
  // AssertionError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => {
//       // throw Error("!!!!!");
//       res.send(users);
//     })
//     .catch((err) => {
//       // console.error(err);
//       errorSelector(res, err);
//     });
// };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  // console.log(User.findOne({ email }));

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error();
        error.name = "AssertionError";
        return Promise.reject(error);
      }
      console.log(password);
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({ email, name, avatar, password: hash });
    })
    .then((newUser) => {
      const response = newUser.toObject();
      delete response.password;
      res.status(CREATED).send({ data: response });
    })
    .catch((err) => {
      // res.status(UNAUTHORIZED_ERROR).send({ message: err });
      console.log(`*****************${err}`);
      errorSelector(res, err);
    });

  // createUser = (req, res) => {
  //   // hashing the password
  //   bcrypt.hash(req.body.password, 10)
  //     .then(hash => User.create({
  //       email: req.body.email,
  //       password: hash, // adding the hash to the database
  //     }))
  //     .then((user) => res.send(user))
  //     .catch((err) => res.status(400).send(err));
  // };

  // User.create({ name, avatar, email, password })
  //   .then((user) => {
  //     res.status(CREATED).send(user);
  //   })
  //   .catch((err) => {
  //     // console.error(err);
  //     errorSelector(res, err);
  //   });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err.name);
      errorSelector(res, err);
    });
};

// const getUser = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .orFail()
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       // console.error(err);
//       errorSelector(res, err);
//     });
// };

// const deleteUser = (req, res) => {
//   const { userId } = req.params;
//   // console.log(userId);
//   User.findByIdAndDelete(userId)
//     .orFail()
//     .then(() => {
//       res.send({});
//     })

//     .catch((err) => {
//       // console.error(err);
//       errorSelector(res, err);
//     });
// };

module.exports = {
  createUser,
  login,

  // getUsers,
  // getUser,
  // deleteUser
};
