import express, { request } from 'express'

const generateRequestId = (() => {
  let nextId = 1
  return () => {
    const id = nextId
    nextId += 1
    return id
  }
})()

const requests = []

const router = express.Router()

router.get('/all', (_, res) => {
  res.status(200).send(requests)
})

router.post('/submit', (req, res) => {
  const request = {
    id: generateRequestId(),
    fullName: req.body?.fullName,
    phoneNumber: req.body?.phoneNumber,
    status: 'pending',
  }

  if (!request.fullName) {
    res.status(400).send('Specify full name.')
    return
  }

  if (!request.phoneNumber) {
    res.status(400).send('Specify phone number.')
    return
  }

  requests.push(request)
  res.sendStatus(200)
})

router.post('/:requestId/review', (req, res) => {
  const requestId = Number(req.params.requestId)
  if (!requests.some((request) => request.id === requestId)) {
    res.sendStatus(404)
    return
  }

  const request = requests.find((request) => request.id === requestId)
  if (request.status !== 'pending') {
    res.status(403).send('Request has already been reviewed.')
  }

  request.note = req.body?.note
  request.status = 'reviewed'

  res.sendStatus(200)
})

export default router
