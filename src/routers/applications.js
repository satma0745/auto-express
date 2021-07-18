import express from 'express'
import { checkSchema, validationResult, param } from 'express-validator'

const generateRequestId = (() => {
  let nextId = 1
  return () => {
    const id = nextId
    nextId += 1
    return id
  }
})()

const applications = []

const router = express.Router()

router.get('/all', (_, res) => res.status(200).send(applications))

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

    const application = {
      id: generateRequestId(),
      fullName: req.body?.fullName,
      phoneNumber: req.body?.phoneNumber,
      status: 'pending',
    }

    applications.push(application)
    return res.sendStatus(200)
  }
)

router.post('/:applicationId/review', param('applicationId').isInt().toInt(), (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() })
  }

  const applicationId = req.params.applicationId
  if (!applications.some((application) => application.id === applicationId)) {
    return res.sendStatus(404)
  }

  const application = applications.find((application) => application.id === applicationId)
  if (application.status !== 'pending') {
    return res.status(403).send('Request has already been reviewed.')
  }

  application.note = req.body?.note
  application.status = 'reviewed'

  return res.sendStatus(200)
})

export default router
