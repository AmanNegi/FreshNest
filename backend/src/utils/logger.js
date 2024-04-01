const winston = require('winston')

const devTransports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'combined.log' })
]
const testTransports = [
  new winston.transports.File({ filename: 'test.log' })
]

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: process.env.NODE_ENV === 'test' ? testTransports : devTransports
})

module.exports = logger
