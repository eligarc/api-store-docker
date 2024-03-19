const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}


function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError && err.isBoom) {
    res.status(409).json({
      statusCode: 409,
      menssage: err.name,
      errors: err.errors
    })
  }

  else if(err instanceof ForeignKeyConstraintError && err.isBoom ) {
    res.status(422).json({
      statusCode: 422,
      menssage: err.name,
      errors: err.errors
    })
  }

  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
