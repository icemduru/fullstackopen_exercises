const morgan = require('morgan');
const logger = require('./logger');

morgan.token('custom', (req) => JSON.stringify(req.body));

const reqLogger = morgan(':method :url :status :res[content-length] - :response-time ms :custom');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler,
};
