const routes = require('express').Router();
const axios = require('axios')
const parseXMLString = require('xml2js').parseString
const apis = require('../apis');

routes.post('/', (req, res) => {
  // Verify request source/referrer (whitneycanrey.com)
  // Verify request body
  // Verify request body.address
  // Verify request body.emailAddress (included and valid format)

  const formData = req.body;
  const address = formData.address;

  // Send request to Zestimate
  // Error handling!
  // .then( verify Zillow response)
  // if no amount - what to send back to FE? Error with email to Whitney?
  // if zillow error - what to send back to FE? Error with email to Whitney for followup?
  const handleZillowResponse = (zillowResponse) => {
    res.setHeader('Content-Type', 'application/json');
    return parseXMLString(zillowResponse.data, { explicitArray: false }, (err, result) => res.send(JSON.stringify(result)))
  }

  // home details:
  //   SearchResults:searchresults.request.address
  //   SearchResults:searchresults.request.citystatezip
  
  // zillow homeId
  //   SearchResults:searchresults.response.results.result.zpid

  // zillow estimated value:
  //   SearchResults:searchresults.response.results.result.zestimate.amount._ (need to format into USD currency)

  // zillow home details:
  //   SearchResults:searchresults.response.results.result.links.comparables
  //   SearchResults:searchresults.response.results.result.links.homedetails

  axios({ url: `${apis.zillow}?zws-id=${process.env.ZWSID}&address=urlEncodedAddress`, responseType: 'text' })
    .then(handleZillowResponse)

});

module.exports = routes
