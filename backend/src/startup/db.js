const mongoose = require('mongoose')

module.exports = async function () {
  const dbUrl = process.env.DATABASE_URL

  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to Database...'))
    .catch((err) => console.log(err))
}
