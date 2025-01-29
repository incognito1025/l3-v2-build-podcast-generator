//middleware/errorHandler.js
//middleware to handle erros
function errorHandler(err, req, res, next) {
  console.error(err); //log the error
  res.status(500).send({ error: "Something went wrong!" });
}

module.exports = { errorHandler };
