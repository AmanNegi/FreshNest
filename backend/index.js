const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./src/utils/logger')
const dotenv = require('dotenv')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const env = process.env.NODE_ENV || 'prod'
dotenv.config({ path: `.env.${env}` })

const app = express()

const corsPrefs = cors({
  origin: ['https://fresh-nest.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization']
})

const customLogger = (req, _, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
}

app.use(corsPrefs)
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(customLogger)
require('./src/startup/routes')(app)

if (env === 'dev') {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

if (env !== 'test') require('./src/startup/db')()

const port = process.env.PORT || 3000

module.exports = app.listen(port, () => console.log(`Listening on Port ${port}...`))
