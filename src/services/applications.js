const generateRequestId = (() => {
  let nextId = 1
  return () => {
    const id = nextId
    nextId += 1
    return id
  }
})()

const applications = []

const getAllApplications = () => applications

const submitNewApplication = (application) =>
  applications.push({
    ...application,
    id: generateRequestId(),
    status: 'pending',
  })

const reviewApplication = (applicationId, { note }) => {
  if (!applications.some((application) => application.id === applicationId)) {
    throw new Error('Not found.')
  }

  const application = applications.find((application) => application.id === applicationId)
  if (application.status !== 'pending') {
    throw new Error('Request has already been reviewed.')
  }

  application.note = note
  application.status = 'reviewed'
}

module.exports = { getAllApplications, submitNewApplication, reviewApplication }
