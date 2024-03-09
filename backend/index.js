const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./utils/logger')
const dotenv = require('dotenv')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

dotenv.config({ path: '.env.prod' })

const app = express()

const corsPrefs = cors({
  origin: ['https://fresh-nest.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization']
})

const customLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
}

app.use(corsPrefs)
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(customLogger)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./src/startup/routes')(app)
require('./src/startup/db')()
console.log(process.env.NODE_ENV)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}...`))

module.exports.app = app
