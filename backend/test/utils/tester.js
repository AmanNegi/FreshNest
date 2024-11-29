const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index.js')
const { DBHelper } = require('./db_helper.js')

class FreshNestTester {
/** @type {ChaiHttp.Agent} */
  requester
  /** @type {DBHelper} */
  dbHelper
  openTester () {
    chai.use(chaiHttp)
    this.requester = chai.request(app).keepOpen()
  }

  async openDatabase () {
    this.dbHelper = new DBHelper()
    return this.dbHelper.connect()
  }

  async openTesterAndDatabase () {
    await this.openDatabase()
    this.openTester()
  }

  async closeTester () {
    await this.dbHelper.clearDB()
    await this.dbHelper.disconnect()
    this.requester.close()
  }
}

module.exports.FreshNestTester = FreshNestTester
