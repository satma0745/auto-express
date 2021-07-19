const { checkSchema, param } = require('express-validator')

const submit = checkSchema({
  fullName: {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Specify full name.',
  },
  phoneNumber: {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Specify phone number.',
  },
})

const review = param('applicationId').isInt().toInt()

module.exports = { submit, review }
