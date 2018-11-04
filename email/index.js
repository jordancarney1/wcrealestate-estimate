const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const responseTemplate = require('./estimate-response.template')
const notificationTemplate = require('./estimate-notification.template')

function sendEstimate(data) {
  const responseData = responseTemplate(data)
  const notificationData = notificationTemplate(data)

  // TODO: Error handling
  mailgun.messages().send(responseData, (error, body) => {
    if (error) console.error(error)
  });
  mailgun.messages().send(notificationData, (error, body) => {
    if (error) console.error(error)
  });
}

module.exports = sendEstimate;
