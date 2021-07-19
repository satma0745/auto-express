const { validationResult } = require('express-validator')

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() })
  }

  return next()
}

module.exports = { validateRequest, applicationRules: require('./application') }
