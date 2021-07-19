const express = require('express')
const routers = require('../routers')

const configure = () => {
  const app = express()

  app.use(express.json())

  app.use('/api/applications', routers.applications)

  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`Listening on ${port} port.`)
  })
}

module.exports = configure
