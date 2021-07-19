const express = require('express')
const config = require('./config')
const routers = require('./routers')

const app = express()

app.use(express.json())

app.use('/api/applications', routers.applications)

const port = 5050
app.listen(port, () => {
  console.log(`Listening on ${port} port.`)
})

config.environment()
config.database()
