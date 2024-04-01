const { validateComment } = require('../../src/models/comment.js')
const chai = require('chai')
const mongoose = require('mongoose')

/**
 * This file tests the cart model
 */
describe('test comment model', () => {
  it('should throw error when no commentBy is provided', async () => {
    const comment = {
      name: 'Poster\'s Name',
      content: 'I am a comment',
      itemID: '1'
    }

    const res = validateComment(comment)
    chai.expect(res.value).to.deep.equal(comment)
    chai
      .expect(res.error.details[0].message)
      .to.be.equal('"commentBy" is required')
  })

  it('should throw error when invalid commentBy is provided', async () => {
    const comment = {
      commentBy: 'invalid_id',
      name: 'Poster\'s Name',
      content: 'I am a comment',
      itemID: '1'
    }

    const expectedError =
        '"commentBy" with value "invalid_id" fails to match the valid mongo id pattern'

    const res = validateComment(comment)

    chai.expect(res.value).to.deep.equal(comment)
    chai.expect(res.error.details[0].message).to.be.equal(expectedError)
  })

  it('should throw error when the commentBy is valid but itemID is invalid', async () => {
    const expectedError = '"itemID" with value "1" fails to match the valid mongo id pattern'
    const userId = new mongoose.Types.ObjectId()

    const comment = {
      commentBy: userId.toString(),
      name: 'Poster\'s Name',
      content: 'I am a comment',
      itemID: '1'
    }
    const res = validateComment(comment)
    chai.expect(res.value).to.deep.equal(comment)
    chai.expect(res.error.details[0].message).to.be.equal(expectedError)
  })

  it('should return success when the commentBy is valid and itemID is also valid', async () => {
    const userId = new mongoose.Types.ObjectId()
    const itemId = new mongoose.Types.ObjectId()

    const comment = {
      commentBy: userId.toString(),
      name: 'Poster\'s Name',
      content: 'I am a comment',
      itemID: itemId.toString()
    }
    const res = validateComment(comment)
    chai.expect(res.value).to.deep.equal(comment)
    chai.expect(res.error).to.be.equal(undefined)
  })
})
