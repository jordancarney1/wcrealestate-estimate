module.exports = function(data) {
  const {
    address,
    requestEmail,
    comparablesLink,
    homeDetailsLink,
    formattedZestimate,
    formattedZestimateRangeLow,
    formattedZestimateRangeHigh,
  } = data; 

  return {
    from: `${process.env.MAIN_NAME_FULL} <${process.env.MAIN_EMAIL}>`,
    to: `${process.env.MAIN_NAME_FULL}, ${process.env.MAIN_EMAIL}`,
    subject: 'New Estimate Requested!',
    text: `New estimate requested:
    Requestor: ${requestEmail}
    Address: ${address}

    ZILLOW
    Zestimate: $${formattedZestimate}
    Zestimate Range: $${formattedZestimateRangeLow} - $${formattedZestimateRangeHigh}
    Home Details: ${homeDetailsLink}
    Comparables: ${comparablesLink}`,
  }
}
