const mongoose = require('mongoose')
const logger = require('../utils/logger')
/**
 *
 * @returns {Promise<mongoose | undefined | Error>} - Resolves to a connection object if successful
 */
module.exports = async function () {
  const dbUrl = process.env.DATABASE_URL

  try {
    const res = await mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    if (res) {
      console.log('Connected to Database...')
      return res
    }

    return undefined
  } catch (err) {
    logger.error('Error connecting to Database: ', err)
    return err
  }
}
