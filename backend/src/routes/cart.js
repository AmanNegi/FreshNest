const express = require('express')
const router = express.Router()
const { getSuccessResponse, getErrorResponse } = require('../utils/response')
const { Cart } = require('../models/cart')
const _ = require('lodash')
const { mongoose } = require('mongoose')

/**
 * Get cart for a user
 * @param {Object} req - The request object.
 * @param {string} req.params.userId - The user's ID.
 */
router.get('/get/:userId', async function (req, res) {
  const userId = req.params.userId

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(getErrorResponse('Invalid User ID'))
  }

  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      // There's no cart for this user created yet
      // Create an empty cart in that case
      return res.send(getSuccessResponse('Created New Cart', { items: [] }))
    }
    return res.send(
      getSuccessResponse('Success', _.omit(cart.toObject(), ['__v']))
    )
  } catch (e) {
    console.log(e)
  }
})

/**
 * Add item to cart
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.userId - The user's ID.
 * @param {string} req.body.item - The item to add.
 * @param {number} req.body.count - The count of the item.
 */
router.post('/add', async (req, res) => {
  const { userId, item, count } = req.body

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.send(getErrorResponse('Invalid User ID'))
  }

  const cart = await Cart.findOne({ userId })

  if (!cart) {
    // There's no cart for this user created yet
    const newCart = new Cart({
      userId,
      items: [{ item, count }]
    })
    await newCart.save()
    return res.send(getSuccessResponse('Saved Item to Cart', newCart))
  }

  // There's a cart for this user already
  // Check if a product with same id pre-exists
  const value = cart.items.filter((e) => e.item === item)

  if (value && value.length === 1) {
    // If it does simply add the count
    cart.items = cart.items.map((e) => {
      if (e.item === item) {
        e.count = e.count + count
        console.log('New Count: ', e.count)
      }
      return e
    })

    console.log('Item Prexists, increment quantity')
  } else {
    // Else add the item to the cart
    cart.items = [{ item, count }, ...cart.items]
  }

  await cart.save()

  return res.send(getSuccessResponse('Saved Item to Cart', cart))
})

/**
 * Update item count in cart
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.userId - The user's ID.
 * @param {string} req.body.itemId - The item's ID.
 * @param {number} req.body.count - The count of the item.
 *
 */
router.post('/update', async (req, res) => {
  const { userId, itemId, count } = req.body

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(getErrorResponse('Invalid User ID'))
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).send(getErrorResponse('Invalid Item ID'))
  }

  const cart = await Cart.findOne({ userId })

  if (!cart) {
    return res
      .status(404)
      .send(getErrorResponse('No cart exists for this userId'))
  }

  cart.items = cart.items.map((e) => {
    if (e.item.toString() === itemId) {
      e.count = count
    }
    return e
  })
  await cart.save()

  const response = cart.items.find((e) => e.item.toString() === itemId)
  return res.send(getSuccessResponse('Successfully updated cart', response))
})

/**
 * Remove item from cart
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.userId - The user's ID.
 * @param {string} req.body.itemId - The item's ID.
 */
router.post('/remove', async (req, res) => {
  const { userId, itemId } = req.body

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(getErrorResponse('Invalid Cart Item ID'))
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).send(getErrorResponse('Invalid Item ID'))
  }

  const cart = await Cart.findOne({ userId })

  if (!cart) {
    return res
      .status(404)
      .send(getErrorResponse('No cart exists for this userId'))
  }

  const len = cart.items.length
  cart.items = cart.items.filter((e) => e.item.toString() !== itemId)

  if (cart.items.length === len) {
    // No item was removed, means it doesn't exist
    return res
      .status(404)
      .send(getErrorResponse('No item of this ID is present in your cart'))
  }

  await cart.save()

  return res.send(
    getSuccessResponse('Successfully removed item from cart', cart)
  )
})

module.exports = router
