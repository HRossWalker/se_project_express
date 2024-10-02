const CREATED = 201;
const INPUT_ERROR = 400;
const NO_SUCH_ID_ERROR = 404;
const SERVER_ERROR = 500;

const errorSelector = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(INPUT_ERROR).send({ message: "Invalid data" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NO_SUCH_ID_ERROR).send({ message: "No such ID" });
  }
  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = { errorSelector, CREATED, NO_SUCH_ID_ERROR };
