const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'FreshNest Backend',
    description: 'Node/Express backend for FreshNest application'
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints for user authentication'

    }
  ]
}

const outputFile = '../swagger_output.json'
const endpointsFiles = ['../startup/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
