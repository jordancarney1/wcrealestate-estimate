const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

function sendEstimate(data) {
  const {
    address,
    requestEmail,
    comparablesLink,
    homeDetailsLink,
    formattedEstimate,
  } = data;

  const requestorEmail = {
    from: `Whitney Carney <${process.env.MAIN_EMAIL}>`,
    to: reqestEmail,
    subject: `Estimate for ${address}`,
    text: `Hi there,
    Here is your home value estimate for ${address}.
    $${formattedEstimate}`,
  }

  const requestNotificationEmail = {
    from: `Whitney Carney <${process.env.MAIN_EMAIL}>`,
    to: `Whitney Carney, ${process.env.MAIN_EMAIL}`,
    subject: 'New Estimate Requested!',
    text: `New estimate requested:
    Requestor: ${requestEmail},
    Address: ${address},
    Zestimate: ${formattedEstimate},
    Home Details: ${homeDetailsLink},
    Comparables: ${comparablesLink}`
  }

  mailgun.messages().send(requestorEmail, (error, body) => console.log(body));
  mailgun.messages().send(requestNotificationEmail, (error, body) => console.log(body));
}

module.exports = sendEstimate;
