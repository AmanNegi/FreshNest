const chai = require('chai')

const { getErrorResponse, getSuccessResponse } = require('../src/utils/response')

describe('Test utils/response', () => {
  it('should return 200 status code', () => {
    const response = getSuccessResponse('Success', {})
    chai.expect(response).to.have.property('statusCode', 200)
    chai.expect(response).to.have.property('message', 'Success')
  })

  it('should return 200 status code with data', () => {
    const data = {
      file: 'response.js'
    }
    const response = getSuccessResponse('Success', data)
    chai.expect(response).to.have.property('statusCode', 200)
    chai.expect(response).to.have.property('message', 'Success')
    chai.expect(response).to.have.property('data')
    chai.expect(response.data).to.be.equal(data)
  })

  it('should return 404 status code and message', () => {
    const response = getErrorResponse('Error')
    chai.expect(response).to.have.property('statusCode', 404)
    chai.expect(response).to.have.property('message', 'Error')
  })
})
