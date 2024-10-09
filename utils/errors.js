const CREATED = 201;
const INPUT_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const NO_SUCH_ID_ERROR = 404;
const ASSERTION_ERROR = 409;
const SERVER_ERROR = 500;

class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
}

const errorSelector = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(INPUT_ERROR).send({ message: "Invalid data" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NO_SUCH_ID_ERROR).send({ message: "No such ID" });
  }
  if (err.name === "UnauthorizedError" || "Error") {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Email or Password incorrect" });
  }
  if (err.name === "AssertionError") {
    return res.status(ASSERTION_ERROR).send({ message: "User already exists" });
  }
  // if (err.name === "Error") {
  //   return res
  //     .status(INPUT_ERROR)
  //     .send({ message: "Ensure all fields are filled in to requirements" });
  // }
  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = {
  errorSelector,
  CREATED,
  NO_SUCH_ID_ERROR,
  UNAUTHORIZED_ERROR,
  AssertionError,
};
