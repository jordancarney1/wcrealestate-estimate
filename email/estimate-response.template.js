module.exports = function(data) {
  const {
    address,
    requestEmail,
    formattedZestimateRangeLow,
    formattedZestimateRangeHigh,
  } = data;

  return {
    from: `${process.env.MAIN_NAME_FULL} <${process.env.MAIN_EMAIL}>`,
    to: requestEmail,
    subject: `Estimate Request for ${address}`,
    text: `Hi there,

    You can see the instant valuations for your home below:

    Zillow Zestimate</b>
    Between $${formattedZestimateRangeLow} and $${formattedZestimateRangeHigh}
    
    These online valuations aren't always as accurate as they could be, so I can create a custom report for you. Have you recently remodeled or know of anything that might affect your home's value?

    Regards,

    ${process.env.MAIN_NAME_FULL}
    ${process.env.SIGNATURE_TAG_LINE}
    ${process.env.MAIN_PHONE}
    ${process.env.MAIN_EMAIL}`,
    html: `
      <html>
      Hi there,<br />
      <br />
      You can see the instant valuations for your home below:<br />
      <br />
      <b>Zillow Zestimate</b><br />
      Between <b>$${formattedZestimateRangeLow}</b> and <b>$${formattedZestimateRangeHigh}</b><br />
      <br />
      These online valuations aren't always as accurate as they could be, so I can create a custom report for you. Have you recently remodeled or know of anything that might affect your home's value?
      <br /><br />
      Regards,<br/>
      <br/>
      ${process.env.MAIN_NAME_FULL}<br/>
      ${process.env.SIGNATURE_TAG_LINE}<br/>
      <a href="tel: ${process.env.MAIN_PHONE}">${process.env.MAIN_PHONE}</a><br/>
      ${process.env.MAIN_EMAIL}<br/>
      </html>
    `,
  }
}
