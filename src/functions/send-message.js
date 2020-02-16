const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

exports.handler = async(event, context) => {
  const payload = JSON.parse(event.body)
  const {
    name,
    email,
    company
  } = payload

  sgMail.setApiKey(SENDGRID_API_KEY)

  const titleCase = (text) => `${text.trim().charAt(0).toUpperCase()}${text.trim().slice(1)}`
  const body = Object.keys(payload).map((key) => {
    return `<p>${titleCase(key)}: ${payload[key]}</p>`
  }).join('')

  const message = {
    to: SENDGRID_TO_EMAIL,
    from: email,
    subject: `${company} - ${name}`,
    html: body
  }

  try {
    await sgMail.send(message)

    return {
      statusCode: 200,
      body: JSON.stringify({
        code: 200,
        message: 'Message successfully sent'
      })
    }
  } catch (error) {
    return {
      statusCode: error.code,
      body: JSON.stringify(error)
    }
  }
}
