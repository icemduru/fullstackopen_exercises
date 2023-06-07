const logger = require('./logger')
const morgan = require('morgan')

morgan.token('custom', function (req) { return JSON.stringify(req.body) })

const reqLogger = morgan(':method :url :status :res[content-length] - :response-time ms :custom')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
    reqLogger,
    unknownEndpoint,
    errorHandler
  }