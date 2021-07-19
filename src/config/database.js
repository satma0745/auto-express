const { connect, connection } = require('mongoose')

const configure = () => {
  connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  connection.on('open', () => console.log('Connected to a database.'))
}

module.exports = configure
