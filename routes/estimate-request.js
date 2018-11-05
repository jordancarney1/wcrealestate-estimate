const router = module.exports = require('express').Router()
const apis = require('../apis')
const sendEstimate = require('../email')

router.post('/estimate-request', (req, res) => {
  // TODO: Implment request validation
  // if (
  //   req.headers.origin !== 'deployed address' ||
  //   req.headers.referer !== 'deployed address'
  // ) { console.error('Not from trusted requestor') }

  // TODO: Implement request validation
  // if (
  //   !req.body
  //   !req.body.emailAddress
  //   !req.body.streetAddress
  //   !req.body.city
  //   !req.body.state
  // ) { console.error('Not a valid request') }


  const {
    address,
    email: requestEmail,
  } = req.body
  
  // TODO: Need validations
  const [streetAddress, city, state, zip]= address.split(',').map(val => val.trim())

  const apiRequests = [
    apis.zillow.sendRequest({streetAddress, city, state, zip}),
  ]

  // Error handling!
  // if no amount - what to send back to FE? Error with email to Whitney?
  // if zillow error - what to send back to FE? Error with email to Whitney for followup?
  // TODO: Refactor to make generic
  const sendApiResults = (apiResults) => {

    const {
      zestimate,
      zestimateRangeHigh,
      zestimateRangeLow,
      zillowPropertyId,
      comparablesLink,
      homeDetailsLink,
    } = apiResults

    const dataToSend = {
      address,
      requestEmail,
      comparablesLink,
      homeDetailsLink,
      formattedZestimate: parseInt(zestimate).toLocaleString('en-US'),
      formattedZestimateRangeHigh: parseInt(zestimateRangeHigh).toLocaleString('en-US'),
      formattedZestimateRangeLow: parseInt(zestimateRangeLow).toLocaleString('en-US'),
      zillowPropertyId,
    }

    sendEstimate(dataToSend)
  }

  const toResultObject = (promise) => {
    return promise
      .then(result => ({ success: true, result }))
      .catch(error => ({ success: false, error }))
  }

  Promise.all(apiRequests.map(toResultObject))
    .then(apiResults => {
      apiResults.forEach((request, index) => {
        if (!request.success) {
          // TODO: Error handling
          console.error('Request failed.', request.error)
          return
        }

        if (index === 0) {
          const zillowData = apis.zillow.handleResponse(request.result)
          sendApiResults(zillowData)
          res.status(200).send('ok')
        }
      })
    })
    .catch(err => console.error('Promise All...', err))

})