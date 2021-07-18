import express from 'express'

const generateRequestId = (() => {
  let nextId = 1
  return () => {
    const id = nextId
    nextId += 1
    return id
  }
})()

const applications = []

const router = express.Router()

router.get('/all', (_, res) => {
  res.status(200).send(applications)
})

router.post('/submit', (req, res) => {
  const application = {
    id: generateRequestId(),
    fullName: req.body?.fullName,
    phoneNumber: req.body?.phoneNumber,
    status: 'pending',
  }

  if (!application.fullName) {
    res.status(400).send('Specify full name.')
    return
  }

  if (!application.phoneNumber) {
    res.status(400).send('Specify phone number.')
    return
  }

  applications.push(application)
  res.sendStatus(200)
})

router.post('/:applicationId/review', (req, res) => {
  const applicationId = Number(req.params.applicationId)
  if (!applications.some((application) => application.id === applicationId)) {
    res.sendStatus(404)
    return
  }

  const application = applications.find(
    (application) => application.id === applicationId
  )
  if (application.status !== 'pending') {
    res.status(403).send('Request has already been reviewed.')
  }

  application.note = req.body?.note
  application.status = 'reviewed'

  res.sendStatus(200)
})

export default router
