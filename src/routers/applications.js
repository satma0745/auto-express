const express = require('express')

const { validateRequest, applicationRules } = require('../validation')
const service = require('../services/applications')

const router = express.Router()

router.get('/all', (_, res) => {
  const applications = service.getAllApplications()
  return res.status(200).send(applications)
})

router.post('/submit', applicationRules.submit, validateRequest, (req, res) => {
  service.submitNewApplication(req.body)
  return res.sendStatus(200)
})

router.post('/:applicationId/review', applicationRules.review, validateRequest, (req, res) => {
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

module.exports = router
