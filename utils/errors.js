const INPUT_ERROR = 400;
const NO_SUCH_ID_ERROR = 404;
const SERVER_ERROR = 500;

const errorSelector = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(INPUT_ERROR).send({ message: err.message });
  } else if (err.name === "DocumentNotFoundError") {
    return res.status(NO_SUCH_ID_ERROR).send({ message: err.message });
  }
  return res.status(SERVER_ERROR).send({ message: err.message });
};

module.exports = { errorSelector };
