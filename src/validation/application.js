const { checkSchema } = require('express-validator')
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

const review = checkSchema({
  applicationId: {
    in: 'param',
    notEmpty: true,
    errorMessage: 'Specify application id.',
    custom: {
      options: (idCandidate) => {
        if (!isValidObjectId(idCandidate)) {
          throw new Error('Invalid id format.')
        }

        return true
      },
    },
    customSanitizer: {
      options: (stringId) => {
        return Types.ObjectId(stringId)
      },
    },
  },
  note: {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Specify note.',
    isLength: {
      options: { max: 1000 },
      errorMessage: 'Note cannot exceed 1000 characters.',
    },
  },
})

module.exports = { submit, review }
