const User = require("../models/user");

//GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      // throw Error("!!!!!");
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
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
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
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
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (
        err.name === "CastError"
        //handle the cast error
      ) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  User.findByIdAndDelete(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({});
    })

    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(400).send({ message: err.message });
      } else if (
        err.name === "CastError"
        //handle the cast error
      ) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser, deleteUser };
