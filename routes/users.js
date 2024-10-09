const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  // deleteUser,
  login,
} = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);
// router.post("/", login);
// router.delete("/:userId", deleteUser);

module.exports = router;
