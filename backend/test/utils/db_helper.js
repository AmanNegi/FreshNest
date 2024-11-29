const { MilletItem } = require('../../src/models/millet_item')
const { User } = require('../../src/models/user')
const db = require('./db')

class DBTestHelper {
  /** @type {mongoose} */
  dbInstance

  constructor (dbInstance) {
    this.dbInstance = dbInstance
  }

  async connect () {
    this.dbInstance = await db()
  }

  async disconnect () {
    await this.dbInstance.disconnect()
  }

  async clearDB () {
    const collections = Object.keys(this.dbInstance.connection.collections)
    for (const collectionName of collections) {
      const collection = this.dbInstance.connection.collections[collectionName]
      await collection.deleteMany()
    }
  }

  /**
   *  Create a mock user for testing
   * @returns {Promise<User>} - Resolves to the created user
   */
  async createUser () {
    // check if a user exists already
    const user = await User.findOne({ email: 'johndoe@example.com' })

    if (user) return user

    const newUser = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      phone: '1234567899',
      userType: 'farmer',
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    })

    return await newUser.save()
  }

  async addItem (userId) {
    const newItem = new MilletItem({
      name: 'Millet Item',
      description: 'This is a millet item',
      listedBy: userId,
      images: [],
      comments: [],
      price: 20.99
    })

    return await newItem.save()
  }

  async addNItems (n, userId) {
    for (let i = 0; i < n; i++) {
      await this.addItem(userId)
    }
  }
}

module.exports.DBHelper = DBTestHelper
