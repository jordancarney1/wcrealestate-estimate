module.exports = function(data) {
  const {
    address,
    formattedEstimate,
    requestEmail,
  } = data;

  return {
    from: `${process.env.MAIN_NAME_FULL} <${process.env.MAIN_EMAIL}>`,
    to: requestEmail,
    subject: `Estimate for ${address}`,
    text: `Hi there,

    You can see the instant valuations for your home below:

    <b>Eppraisal</b>: Between <b>$166,515</b> and <b>$225,285</b>
    <b>Zillow Zestimate</b>: Between <b>$199,674</b> and <b>$220,692</b>
    
    Here is your home value estimate for ${address}.
    $${formattedEstimate}

    These online valuations aren't always as accurate as they could be, so I can create a custom report for you. Have you recently remodeled or know of anything that might affect your home's value?

    Regards,

    ${process.env.MAIN_NAME_FULL}
    ${process.env.MAIN_EMAIL}
    ${process.env.MAIN_PHONE}`,
  }
}
