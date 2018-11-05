const axios = require('axios')
const parseXMLString = require('xml2js').parseString

const url = 'https://www.zillow.com/webservice/GetSearchResults.htm'

module.exports = {
  sendRequest: ({streetAddress, city, state, zip}) => axios({
    method: 'get',
    url,
    params: {
      'zws-id': process.env.ZWSID,
      address: streetAddress,
      citystatezip: city+','+state+(zip ? ','+zip : ''),
    },
    responseType: 'text',
  }),
  handleResponse: (zillowResponse) => {
    console.log('============')
    console.log(zillowResponse)
    console.log('============')
    console.log(zillowResponse.data)
    console.log('============')
    let jsonResponse
    if (
      zillowResponse &&
      typeof zillowResponse === 'object' &&
      zillowResponse.status === 200 &&
      zillowResponse.data &&
      typeof zillowResponse.data === 'string'
    ) {
      parseXMLString(zillowResponse.data, { explicitArray: false }, (err, result) => jsonResponse = JSON.parse(JSON.stringify(result)))
    } else {
      throw new Error('Zillow request failed')
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

      return {
        zillowPropertyId,
        zestimate,
        zestimateRangeHigh,
        zestimateRangeLow,
        comparablesLink,
        homeDetailsLink,
      }
    }
  },
}
