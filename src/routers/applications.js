import express from 'express'
import { checkSchema, validationResult, param } from 'express-validator'

import * as service from '../services/applications.js'

const router = express.Router()

router.get('/all', (_, res) => {
  const applications = service.getAllApplications()
  return res.status(200).send(applications)
})

router.post(
  '/submit',
  checkSchema({
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
  }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ validationErrors: errors.array() })
    }

    service.submitNewApplication(req.body)
    return res.sendStatus(200)
  }
)

router.post('/:applicationId/review', param('applicationId').isInt().toInt(), (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() })
  }

  try {
    service.reviewApplication(req.params.applicationId, req.body)
    return res.sendStatus(200)
  } catch (error) {
    switch (error.message) {
      case 'Not found.':
        return res.sendStatus(404)
      case 'Request has already been reviewed.':
        return res.status(403).send(error.message)
      default:
        return res.sendStatus(500)
    }
  }
})

export default router
