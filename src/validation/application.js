const { checkSchema, param } = require('express-validator')
const { Types, isValidObjectId } = require('mongoose')

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

const review = param('applicationId')
  .custom((idCandidate) => {
    if (!isValidObjectId(idCandidate)) {
      throw new Error('Invalid id format.')
    }

    return true
  })
  .customSanitizer((stringId) => {
    return Types.ObjectId(stringId)
  })

module.exports = { submit, review }
