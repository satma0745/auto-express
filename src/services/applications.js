const { Application } = require('../models')

const getAllApplications = () => Application.find()

const submitNewApplication = (application) => Application.create(application)

const reviewApplication = async (applicationId, { note }) => {
  const application = await Application.findById(applicationId)
  if (!application) {
    throw new Error('Not found.')
  }

  if (application.status !== 'pending') {
    throw new Error('Request has already been reviewed.')
  }

  await Application.updateOne(
    { _id: application.id },
    { note, status: 'reviewed' },
    { runValidators: true }
  )
}

module.exports = { getAllApplications, submitNewApplication, reviewApplication }
