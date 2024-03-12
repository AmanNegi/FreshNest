const { validateCart } = require('../../src/models/cart.js')
const chai = require('chai')
const mongoose = require('mongoose')

/**
 * This file tests the cart model
 */
describe('test cart model', () => {
  it('should throw error when no userId is provided', async () => {
    const cart = {
      items: []
    }

    const res = validateCart(cart)
    chai.expect(res.value).to.deep.equal(cart)
    chai
      .expect(res.error.details[0].message)
      .to.be.equal('"userId" is required')
  })
  it('should throw error when invalid userId is provided', async () => {
    const cart = {
      userId: 'invalid_id',
      items: []
    }

    const expectedError =
      '"userId" with value "invalid_id" fails to match the valid mongo id pattern'

    const res = validateCart(cart)

    chai.expect(res.value).to.deep.equal(cart)
    chai.expect(res.error.details[0].message).to.be.equal(expectedError)
  })
  it('should return success when the userId is correct', async () => {
    const objectId = new mongoose.Types.ObjectId()
    const cart = {
      userId: objectId.toString(),
      items: []
    }
    const res = validateCart(cart)

    chai.expect(res.value).to.deep.equal(cart)
  })

  it('should return error when wrong objects are provided in cart items', () => {
    const objectId = new mongoose.Types.ObjectId()
    const cart = {
      userId: objectId.toString(),
      items: [
        {
          name: 'invalid_item1',
          detail: 'invalid_item1_detail'
        },
        {
          name: 'invalid_item2',
          detail: 'invalid_item2_detail'
        }
      ]
    }
    const res = validateCart(cart)
    const expectedError = '"items[0].item" is required'

    chai.expect(res.error.details[0].message).to.be.equal(expectedError)
  })

  it('should return success when correct objects and correct userId are provided in cart items', () => {
    const objectId = new mongoose.Types.ObjectId()
    const cart = {
      userId: objectId.toString(),
      items: [
        {
          count: 1,
          item: objectId.toString()
        },
        {
          count: 1,
          item: objectId.toString()
        }
      ]
    }
    const res = validateCart(cart)

    chai.expect(res.value).to.deep.equal(cart)
  })
})
