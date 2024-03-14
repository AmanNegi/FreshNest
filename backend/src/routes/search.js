const express = require('express')
const router = express.Router()
const { getSuccessResponse, getErrorResponse } = require('../utils/response')
const { MilletItem } = require('../models/millet_item')

/**
 * Search for millet items by name
 * @param {Object} req - The request object.
 * @param {string} req.params.query - The search query.
 */
router.get('/:query', async function (req, res) {
  const query = req.params.query
  console.log(`Searching For ${query}...`)

  try {
    const items = await MilletItem.find({
      name: {
        $regex: query,
        // $options: 'i' makes the search case-insensitive
        $options: 'i'
      }
    })
    return res.send(getSuccessResponse('Success', items))
  } catch (e) {
    return res.send(
      getErrorResponse(`An error occured while searching. ${e.message}`)
    )
  }
})

module.exports = router
