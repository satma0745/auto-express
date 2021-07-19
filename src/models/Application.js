const { Schema, model } = require('mongoose')

const schema = new Schema({
  fullName: {
    type: String,
    required: true,
    immutable: true,
    trim: true,
    minLength: 5,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    immutable: true,
    trim: true,
    minLength: 7,
    maxLength: 25,
  },
  note: {
    type: String,
    trim: true,
    maxLength: 1000,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed'],
    default: 'pending',
  },
})

const Application = model('Application', schema)

module.exports = Application
