const CREATED = 201;
const INPUT_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NO_SUCH_ID_ERROR = 404;
const ASSERTION_ERROR = 409;
const SERVER_ERROR = 500;

class CustomError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}

const errorSelector = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(INPUT_ERROR).send({ message: "Invalid data" });
  }
  if (err.name === "DocumentNotFoundError" || err.name === "NoSuchUserError") {
    return res.status(NO_SUCH_ID_ERROR).send({ message: "No such ID or User" });
  }
  if (err.message === "Incorrect email or password") {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Email or Password incorrect" });
  }
  if (err.name === "ForbiddenError") {
    return res
      .status(FORBIDDEN_ERROR)
      .send({ message: "Item doesn't belong to you" });
  }
  if (err.name === "AssertionError") {
    return res.status(ASSERTION_ERROR).send({ message: "User already exists" });
  }
  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = {
  errorSelector,
  CREATED,
  NO_SUCH_ID_ERROR,
  UNAUTHORIZED_ERROR,
  CustomError,
};
