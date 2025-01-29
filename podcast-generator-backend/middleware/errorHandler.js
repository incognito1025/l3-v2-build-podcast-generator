//middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  res.status(500).send({ error: "Something went wrong!" });
}

module.exports = { errorHandler };
