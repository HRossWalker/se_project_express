const User = require("../models/user");
const { errorSelector } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      // throw Error("!!!!!");
      res.status(200).send(users);
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  // console.log(name, avatar);

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  User.findByIdAndDelete(userId)
    .orFail()
    .then(() => {
      res.status(200).send({});
    })

    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

module.exports = { getUsers, createUser, getUser, deleteUser };
