import express from 'express'

const requests = []

const app = express()
app.use(express.json())

app.post('/api/requests', (req, res) => {
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
  res.send(200)
})

app.get('/api/requests', (_, res) => {
  res.status(200).send(requests)
})

const port = 5050
app.listen(port, () => {
  console.log(`Listening on ${port} port.`)
})
