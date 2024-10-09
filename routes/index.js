const router = require("express").Router();
const clothingItem = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NO_SUCH_ID_ERROR } = require("../utils/errors");

const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NO_SUCH_ID_ERROR).send({ message: "Page does not exist" });
});

module.exports = router;
