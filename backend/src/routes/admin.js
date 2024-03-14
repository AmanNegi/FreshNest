const express = require('express')
const router = express.Router()
const { getSuccessResponse, getErrorResponse } = require('../utils/response')
const { User } = require('../models/user')
const { default: mongoose } = require('mongoose')
const { MilletItem } = require('../models/millet_item')

/**
 * Check if a user is an admin
 * @param {Object} req - The request object.
 * @param {string} req.params.userId - The user's ID.
 */
router.get('/isAdmin/:userId', async function (req, res) {
  const userId = req.params.userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(getErrorResponse('Invalid User ID'))
  }
  const user = await User.findOne({ _id: userId })
  if (!user) {
    return res.status(404).send(getErrorResponse('User not found'))
  }
  if (user.userType === 'admin') {
    return res.send(getSuccessResponse('Success', {
      isAdmin: true
    }))
  } else {
    return res.send(getSuccessResponse('Success', {
      isAdmin: false
    }))
  }
})

/**
 * Delete a product by ID
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.itemId - The ID of the item to delete.
 * @param {string} req.body.adminId - The ID of the admin performing the delete operation.
 */
router.post('/deleteItem', async (req, res) => {
  const { itemId, adminId } = req.body

  // Check and validate itemId
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).send(getErrorResponse('Invalid Item ID'))
  }
  // Check and validate adminId
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(404).send(getErrorResponse('Invalid Admin ID'))
  }

  const user = await User.findOne({ _id: adminId })

  // When mongoose deletes an item it returns it as well

  let deletedItem = await MilletItem.findOne({ _id: itemId })

  if (
    user.userType !== 'admin' &&
    deletedItem.listedBy.toString() !== adminId
  ) {
    return res
      .status(404)
      .send(getErrorResponse('You are not the owner of the item'))
  }

  deletedItem = await MilletItem.findByIdAndDelete(itemId)

  if (!deletedItem) {
    return res
      .status(404)
      .send(getErrorResponse('Item with ID provided not found!'))
  }

  return res.send(getSuccessResponse('Deleted Item', deletedItem))
})

module.exports = router
