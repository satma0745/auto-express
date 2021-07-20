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

schema.statics.exists = async function (applicationId) {
  return !!(await this.find({ _id: applicationId }))
}

schema.statics.isPending = async function (applicationId) {
  const application = await this.findById(applicationId)
  return application.status === 'pending'
}

schema.statics.review = function (applicationId, note) {
  return this.updateOne(
    { _id: applicationId },
    { note, status: 'reviewed' },
    { runValidators: true }
  )
}

const Application = model('Application', schema)

module.exports = Application
