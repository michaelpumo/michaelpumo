const sgMail = require('@sendgrid/mail')
// const validator = require('validator')
// const axios = require('axios')

exports.handler = async(event, context) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }

  return sgMail.send(msg)

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ message: 'Hello world' })
  // }

  // const eventBody = JSON.parse(event.body)
  // console.log(eventBody)

  // const autopilotApikey = process.env.AUTOPILOT_API_KEY
  // const autopilotContactList = process.env.AUTOPILOT_CONTACT_LIST
  // const eventBody = JSON.parse(event.body)
  // const email = eventBody.email.trim()

  // if (!validator.isEmail(email)) {
  //   return {
  //     statusCode: 500,
  //     body: 'Email is not valid.'
  //   }
  // }

  // const data = JSON.stringify({
  //   contact: {
  //     Email: email,
  //     _autopilot_list: autopilotContactList
  //   }
  // })

  // return axios({
  //   method: 'post',
  //   url: 'https://api2.autopilothq.com/v1/contact',
  //   data,
  //   headers: {
  //     autopilotapikey: autopilotApikey,
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => {
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(response.data)
  //     }
  //   })
  //   .catch(error => {
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify(error)
  //     }
  //   })
}

// const fetch = require('node-fetch')
// exports.handler = async function(event, context) {
//   if (!context.clientContext && !context.clientContext.identity) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         msg: 'No identity instance detected. Did you enable it?'
//       }) // Could be a custom message or object i.e. JSON.stringify(err)
//     }
//   }
//   const { identity, user } = context.clientContext
//   try {
//     const response = await fetch('https://api.chucknorris.io/jokes/random')
//     if (!response.ok) {
//       // NOT res.status >= 200 && res.status < 300
//       return { statusCode: response.status, body: response.statusText }
//     }
//     const data = await response.json()

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ identity, user, msg: data.value })
//     }
//   } catch (err) {
//     console.log(err) // output to netlify function log
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
//     }
//   }
// }
