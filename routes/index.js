const routes = require('express').Router();
const axios = require('axios')
const parseXMLString = require('xml2js').parseString
const apis = require('../apis');

routes.post('/', (req, res) => {
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
    city,
    emailAddress,
    state,
    streetAddress,
    zip,
  } = req.body;
  
  // Error handling!
  // if no amount - what to send back to FE? Error with email to Whitney?
  // if zillow error - what to send back to FE? Error with email to Whitney for followup?
  const handleZillowResponse = (zillowResponse) => {
    res.setHeader('Content-Type', 'application/json');
    let jsonResponse;
    if (
      zillowResponse &&
      typeof zillowResponse === 'object' &&
      zillowResponse.status === 200 &&
      zillowResponse.data &&
      typeof zillowResponse.data === 'string'
    ) {
      parseXMLString(zillowResponse.data, { explicitArray: false }, (err, result) => jsonResponse = JSON.parse(JSON.stringify(result)));
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
        },
        links: {
          comparables: comparablesLink,
          homedetails: homeDetailsLink,
        },
      } = jsonResponse["SearchResults:searchresults"].response.results.result
      const formattedEstimate = parseInt(zestimate).toLocaleString('en-US')

      // TODO: Start sending the notifications off!

    } else {
      console.error('Did not get a valid response from Zillow', JSON.stringify(zillowResponse));
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

});

module.exports = routes
