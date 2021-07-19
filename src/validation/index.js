import { validationResult } from 'express-validator'

import * as applicationRules from './application.js'

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() })
  }

  return next()
}

export { validateRequest, applicationRules }
