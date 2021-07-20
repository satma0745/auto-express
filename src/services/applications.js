const { Application } = require('../models')

const getAllApplications = () => Application.find()

const submitNewApplication = (application) => Application.create(application)

const reviewApplication = async (applicationId, { note }) => {
  if (!(await Application.exists(applicationId))) {
    throw new Error('Application not found.')
  }

  if (!(await Application.isPending(applicationId))) {
    throw new Error('Request has already been reviewed.')
  }

  await Application.review(applicationId, note)
}

module.exports = { getAllApplications, submitNewApplication, reviewApplication }
