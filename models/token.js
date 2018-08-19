const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  user_id: { type: String, ref: 'User' },
  access_token: String,
  refresh_token: String,
  token_type: String,
  id_token: String,
  expiry_date: Date
})

module.exports = mongoose.model('Token', tokenSchema)