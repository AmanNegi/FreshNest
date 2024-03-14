const express = require('express')
const router = express.Router()
const { getErrorResponse, getSuccessResponse } = require('../utils/response')
const { MilletItem, validateMilletItem } = require('../models/millet_item')
const { Comment, validateComment } = require('../models/comment')
const mongoose = require('mongoose')
const { User } = require('../models/user')

/**
 * Get all farms in the database
 */
router.get('/getFarms', async (req, res) => {
  const farms = await User.find(
    { userType: 'farmer' },
    {
      password: 0,
      __v: 0
    }
  )

  return res.send(getSuccessResponse('Success!', farms))
})

/**
 * Get 5 recent millet items
 */
router.get('/getRecent', async (req, res) => {
  const items = await MilletItem.find().sort({ dateField: -1 }).limit(5)

  return res.send(getSuccessResponse('Success!', items))
})

/**
 * Get all products in the database
 */
router.get('/getAll', async (req, res) => {
  const items = await MilletItem.find({})

  return res.send(getSuccessResponse('Success!', items))
})

/**
 * Get all millet items listed by a farmer
 * @param {Object} req - The request object.
 * @param {string} req.params.farmerID - The farmer's ID.
 */
router.get('/getAll/:farmerID', async (req, res) => {
  const farmerID = req.params.farmerID
  if (!mongoose.Types.ObjectId.isValid(farmerID)) {
    return res.status(404).send(getErrorResponse('Invalid User ID'))
  }

  let items = await MilletItem.find({})
  items = items.filter((item) => item.listedBy.toString() === farmerID)

  return res.send(getSuccessResponse('Success', items))
})

/**
 * Add a Product
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.listedBy - The ID of the user who listed the item.
 * @param {string} req.body.title - The title of the item.
 * @param {string} req.body.description - The description of the item.
 * @param {number} req.body.price - The price of the item.
 * @param {Array<string>} req.body.image - The array with image URL of the item.
 */
router.post('/addItem', async (req, res) => {
  const { error } = validateMilletItem(req.body)
  if (error) return res.send(getErrorResponse(error.details[0].message))

  if (!mongoose.Types.ObjectId.isValid(req.body.listedBy)) {
    return res.status(404).send(getErrorResponse('Invalid User ID'))
  }
  const item = new MilletItem(req.body)
  await item.save()

  return res.send(getSuccessResponse('Added Item', item))
})

/**
 * Get a Product by ID
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the item.
 */
router.get('/getItem/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send(getErrorResponse('Invalid Product ID'))
  }
  const item = await MilletItem.findOne({ _id: req.params.id })
  if (!item) {
    return res.status(404).send(getErrorResponse('No Product Found'))
  }
  return res.send(getSuccessResponse('Success', item))
})

/**
 * Add a comment to a  product
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.commentBy - The ID of the user who commented.
 * @param {string} req.body.itemID - The ID of the item.
 * @param {string} req.body.comment - The comment.
 */
router.post('/comment', async (req, res) => {
  const { commentBy, itemID } = req.body
  if (!mongoose.Types.ObjectId.isValid(itemID)) {
    return res.status(404).send(getErrorResponse('Invalid Item ID'))
  }
  const item = await MilletItem.findOne({ _id: itemID })

  if (!mongoose.Types.ObjectId.isValid(commentBy)) {
    return res.status(404).send(getErrorResponse('Invalid User ID'))
  }

  const { error } = validateComment(req.body)
  if (error) return res.send(getErrorResponse(error.details[0].message))

  const comment = new Comment(req.body)
  item.comments.push(comment)
  await item.save()

  return res.send(getSuccessResponse('Added Comment', item))
})

/**
 * Get comments for a millet item
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.itemID - The ID of the item.
 */
router.post('/getComments', async (req, res) => {
  const { itemID } = req.body
  if (!mongoose.Types.ObjectId.isValid(itemID)) {
    return res.status(404).send(getErrorResponse('Invalid Item ID'))
  }
  const item = await MilletItem.findOne({ _id: itemID })
  if (!item) {
    return res.status(404).send(getErrorResponse('No Product Found'))
  }
  return res.send(getSuccessResponse('Success!', item.comments))
})

module.exports = router
