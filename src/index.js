import express from 'express'
import * as routers from './routers/index.js'

const app = express()

app.use(express.json())

app.use('/api/requests', routers.requests)

const port = 5050
app.listen(port, () => {
  console.log(`Listening on ${port} port.`)
})
