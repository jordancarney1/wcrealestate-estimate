const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const responseTemplate = require('./estimate-response.template')
const notificationTemplate = require('./estimate-notification.template')

function sendEstimate(data) {
  const responseData = responseTemplate(data)
  const notificationData = notificationTemplate(data)
  mailgun.messages().send(responseData, (error, body) => console.log(body));
  mailgun.messages().send(notificationData, (error, body) => console.log(body));
}

module.exports = sendEstimate;
