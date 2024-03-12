const chai = require('chai')

const { FreshNestTester } = require('../utils/tester')
const { GET_ALL_ITEMS, GET_RECENT_ITEMS, ADD_ITEM, GET_FARMS, GET_ITEM } = require('../utils/endpoints')

describe('Test routes/list.js', function () {
  /** @type {FreshNestTester} */
  let tester
  before(async () => {
    tester = new FreshNestTester()
    await tester.openTesterAndDatabase()
  })

  after(async () => {
    await tester.closeTester()
  })

  describe('GET api/list/getAll', function () {
    it('should return an array of items', function (done) {
      tester.requester.get(GET_ALL_ITEMS)
        .end(function (_, res) {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.have.property('data')
          chai.expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('GET api/list/getFarms', function () {
    it('should return an array of items', function (done) {
      tester.requester.get(GET_FARMS)
        .end(function (_, res) {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.have.property('data')
          chai.expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('GET api/list/getAll/:farmerID', function () {
    it('should return an array of items added by farmer', async function () {
      await tester.dbHelper.clearDB()
      const user = await tester.dbHelper.createUser()
      await tester.dbHelper.addItem(user._id)

      tester.requester.get(GET_ALL_ITEMS + `/${user._id}`)
        .end(function (_, res) {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.have.property('data')
          chai.expect(res.body.data).to.be.an('array')
          chai.expect(res.body.data.length).to.be.equals(1)
        })
    })
  })
  describe('GET api/list/getRecent', function () {
    it('should return the latest 5 items', async function () {
      const user = await tester.dbHelper.createUser()
      // add 6 items and expect only 5 to be returned
      await tester.dbHelper.addNItems(6, user._id)

      tester.requester
        .get(GET_RECENT_ITEMS)
        .end(function (_, res) {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.have.property('data')
          chai.expect(res.body.data).to.be.an('array')
          chai.expect(res.body.data.length).to.be.lessThanOrEqual(5)
        })
    })
  })

  describe('GET api/list/getItem/:id', function () {
    it('should return the item with the given id', async function () {
      const user = await tester.dbHelper.createUser()
      const item = await tester.dbHelper.addItem(user._id)

      tester.requester.get(GET_ITEM + `/${item._id}`)
        .end(function (_, res) {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.have.property('data')
          chai.expect(res.body.data).to.be.an('object')
          chai.expect(res.body.data._id).to.be.equals(item._id.toString())
        })
    })
  })
  describe('POST api/list/addItem', async function () {
    it('should add a new item as farmer', async function () {
      // clear the database and create a user to create a item
      const user = await tester.dbHelper.createUser()

      const newItem = {
        name: 'Test Item',
        description: 'This is a test item',
        price: 10.99,
        listedBy: user._id,
        images: []
      }

      tester.requester.post(ADD_ITEM)
        .send(newItem)
        .end(function (_, res) {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.have.property('data')
          chai.expect(res.body.data).to.have.property('_id')
          chai.expect(res.body.data.name).to.equal(newItem.name)
          chai
            .expect(res.body.data.description)
            .to.equal(newItem.description)
          chai.expect(res.body.data.price).to.equal(newItem.price)
          chai.expect(res.body.data.listedBy).to.equal(newItem.listedBy.toString())
        })
    })
  })
})

exports.chai = chai
