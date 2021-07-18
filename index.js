import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.send('Up and running!')
})

const port = 5050
app.listen(port, () => {
  console.log(`Listening on ${port} port.`)
})
