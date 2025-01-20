const { User, validateLogin, validateGLogin, validateSignUp } = require('../models/user')
const express = require('express')
const { getSuccessResponse, getErrorResponse } = require('../utils/response')
const { hashPassword, comparePasswords } = require('../utils/hashUtil')
const router = express.Router()
const _ = require('lodash')
const { default: mongoose } = require('mongoose')

/**
 * Handles user login.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 */
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.send(getErrorResponse('No User Exists with this email'))
  }

  const validPassword = comparePasswords(req.body.password, user.password)
  if (!validPassword) return res.send(getErrorResponse('Invalid Password'))

  return res.send(
    getSuccessResponse(
      'Login Success',
      _.omit(user.toObject(), ['password', '__v'])
    )
  )
})

/**
 * Handles user signup.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.name - The user's name.
 * @param {string} req.body.password - The user's password.
 * @param {string} req.body.userType - The user's type.
 * @param {string} req.body.phone - The user's phone number.
 * @param {Object} req.body.location - The user's location.
 */
router.post('/signup', async (req, res) => {
  const { error } = validateSignUp(req.body)
  if (error) return res.status(400).send(getErrorResponse(error.details[0].message))

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.send(getErrorResponse('User with this email already exists'))
  }

  let userType = req.body.userType
  if (!userType) userType = 'customer'
  req.body.password = await hashPassword(req.body.password)

  user = new User(req.body)

  await user.save()
  return res.send(
    getSuccessResponse(
      'Signup Successful',
      _.omit(user.toObject(), ['password', '__v'])
    )
  )
})

/**
 * Save credentials for a user (Google Login)
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.name - The user's name.
 */
router.post('/saveGLogin', async (req, res) => {
  const { error } = validateGLogin(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.send(
      getSuccessResponse(
        'Login Success',
        _.omit(user.toObject(), ['password', '__v'])
      )
    )
  }

  let userType = 'customer'
  if (req.body.email === 'asterjoules@gmail.com') {
    userType = 'admin'
  }
  const email = req.body.email

  // By default email is the password itself
  user = new User({
    email,
    name: req.body.name,
    password: await hashPassword(email),
    userType,
    phone: '000'
  })

  await user.save()
  return res.send(
    getSuccessResponse(
      'Signup Successful',
      _.omit(user.toObject(), ['password', '__v'])
    )
  )
})

/**
 * Get All Users (For Admin Panel)
 * @param {Object} req - The request object.
 * @param {string} req.body.adminId - The admin's ID.
 */
router.post('/getAll', async (req, res) => {
  // Validate if Id is valid
  if (!mongoose.Types.ObjectId.isValid(req.body.adminId)) {
    return res.status(404).send(getErrorResponse('Invalid Admin ID'))
  }

  const user = await User.findOne({ _id: req.body.adminId })
  // Check if user exists
  if (!user) {
    return res.send(getErrorResponse('No User Exists with this email'))
  }

  // Check if user is admin
  if (user.userType !== 'admin') {
    return res.status(404).send(getErrorResponse('You are not an Admin!'))
  }

  // User is admin, fetch all users and return
  const users = await User.find({}, {
    password: 0,
    __v: 0
  })
  return res.send(getSuccessResponse('Success', users))
})

/**
 * Check if a user exists with the given email.
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The user's email.
 */
router.post('/exists', async (req, res) => {
  const email = req.body.email
  if (!email) return res.send(getErrorResponse('Enter a valid email'))

  const user = await User.findOne({ email })
  if (!user) {
    return res.send(getErrorResponse('No User Exists with this email address'))
  }
  return res.send(
    getSuccessResponse(
      'User Found',
      _.omit(user.toObject(), ['password', '__v'])
    )
  )
})

/**
 * Add Image to Farmer's Profile
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The user's ID.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.image - The image URL to add.
 */
router.post('/addImage/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.send(getErrorResponse('Invalid User ID'))
  }

  const user = await User.findOne({ _id: req.params.id })
  if (!user) return res.send(getErrorResponse('User not found'))

  const image = req.body.image
  if (!image) return res.send(getErrorResponse('No image found'))

  user.images.push(image)
  await user.save()

  return res.send(getSuccessResponse('Image added successfully', user))
})

/**
 * Get a User by ID
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The user's ID.
 */
router.get('/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) return res.send(getErrorResponse('User not found'))

  return res.send(
    getSuccessResponse(
      'User found',
      _.omit(user.toObject(), ['password', '__v'])
    )
  )
})

module.exports = router
