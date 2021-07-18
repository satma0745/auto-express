import express from 'express'

const requests = []

const router = express.Router()

router.post('/', (req, res) => {
  const request = {
    fullName: req.body?.fullName,
    phoneNumber: req.body?.phoneNumber,
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

router.get('/', (_, res) => {
  res.status(200).send(requests)
})

export default router
