/**
 * This file is used to generate the swagger documentation for the backend.
 * A seperate script is created to run this file to generate the swagger documentation.
 * npm run swagger-autogen
 */
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'FreshNest Backend',
    description: 'Node/Express backend for FreshNest application (for dev only)'
  },
  host: 'localhost:3000'
}

const outputFile = '../swagger_output.json'
const endpointsFiles = ['../startup/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
