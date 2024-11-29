const express = require('express')
const bodyParser = require('body-parser')
const logger = require('../src/utils/logger')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'prod'
dotenv.config()

const app = express()

const customLogger = (req, _, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
}

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(customLogger)
require('../src/startup/routes')(app)

if (env !== 'test') require('../src/startup/db')()

const port = process.env.PORT || 3000

const expressApp = app.listen(port, () => console.log(`Listening on Port ${port}...`))

module.exports = expressApp
