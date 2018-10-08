const router = module.exports = require('express').Router()
const axios = require('axios')
const parseXMLString = require('xml2js').parseString
const apis = require('../apis')
const sendEstimate = require('../email')

router.post('/estimate-request', (req, res) => {
  // TODO: Implment pseudo
  // if (
  //   req.headers.origin !== 'deployed address' ||
  //   req.headers.referer !== 'deployed address'
  // ) { console.error('Not from trusted requestor') }

  // TODO: Implement pseudo
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

  // Error handling!
  // if no amount - what to send back to FE? Error with email to Whitney?
  // if zillow error - what to send back to FE? Error with email to Whitney for followup?
  const handleZillowResponse = (zillowResponse) => {
    let jsonResponse
    if (
      zillowResponse &&
      typeof zillowResponse === 'object' &&
      zillowResponse.status === 200 &&
      zillowResponse.data &&
      typeof zillowResponse.data === 'string'
    ) {
      parseXMLString(zillowResponse.data, { explicitArray: false }, (err, result) => jsonResponse = JSON.parse(JSON.stringify(result)))
    }

    if (
      jsonResponse &&
      jsonResponse["SearchResults:searchresults"] &&
      jsonResponse["SearchResults:searchresults"].message &&
      jsonResponse["SearchResults:searchresults"].message.code === '0'
    ) {
      const {
        zpid: zillowPropertyId,
        zestimate: {
          amount: {
            _: zestimate,
          },
          valuationRange: {
            high: {
              _: zestimateRangeHigh,
            },
            low: {
              _: zestimateRangeLow,
            },
          },
        },
        links: {
          comparables: comparablesLink,
          homedetails: homeDetailsLink,
        },
      } = jsonResponse["SearchResults:searchresults"].response.results.result
      

      const dataToSend = {
        address,
        requestEmail,
        comparablesLink,
        homeDetailsLink,
        formattedZestimate: parseInt(zestimate).toLocaleString('en-US'),
        formattedZestimateRangeHigh: parseInt(zestimateRangeHigh).toLocaleString('en-US'),
        formattedZestimateRangeLow: parseInt(zestimateRangeLow).toLocaleString('en-US'),
      }

      sendEstimate(dataToSend)

    } else {
      console.error('Did not get a valid response from Zillow', zillowResponse)
    }
  }

  axios({
    method: 'get',
    url: apis.zillow,
    params: {
      ['zws-id']: process.env.ZWSID,
      address: streetAddress,
      citystatezip: city+','+state+(zip ? ','+zip : ''),
    },
    responseType: 'text',
  })
    .then(handleZillowResponse)
    .catch(err => console.log(err))

})