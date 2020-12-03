const validator = require('validator')
const sgMail = require('@sendgrid/mail')
const axios = require('axios')

const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL,
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_DATA_CENTER
} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const nl2br = (text = '') => (typeof text !== 'string') ? text : text.toString().replace(/(\r\n|\n\r|\r|\n)/g, '<br>' + '$1')
const titleCase = (text = '') => `${text.trim().charAt(0).toUpperCase()}${text.trim().slice(1)}`

exports.handler = async(event, context) => {
  const payload = JSON.parse(event.body)
  const {
    name,
    email,
    company,
    message
  } = payload

  if (!validator.isEmail(email.trim()) || !name.trim().length || !company.trim().length || !message.trim().length) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        code: 500,
        message: 'Supplied form data is invalid.'
      })
    }
  }

  sgMail.setApiKey(SENDGRID_API_KEY)

  const body = Object.keys(payload).map((key) => {
    return `<p><strong>${titleCase(key)}</strong><br>${nl2br(payload[key])}</p>`
  }).join('')

  const normalizedEmail = validator.normalizeEmail(email)

  const sendgridMessage = {
    to: SENDGRID_TO_EMAIL,
    from: `${name.trim()} <${SENDGRID_FROM_EMAIL}>`,
    subject: 'Website Message',
    html: body
  }

  try {
    const mailchimpUser = {
      email_address: normalizedEmail,
      status: 'subscribed',
      merge_fields: {
        NAME: name.trim(),
        COMPANY: company.trim()
      }
    }

    const mailchimpPayload = {
      method: 'post',
      url: `https://${MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: mailchimpUser
    }

    await axios(mailchimpPayload)
  } catch (error) {
    console.log(error)
  }

  try {
    await sgMail.send(sendgridMessage)

    return {
      statusCode: 200,
      body: JSON.stringify({
        code: 200,
        message: 'Message successfully sent.'
      })
    }
  } catch (error) {
    return {
      statusCode: error.code,
      body: JSON.stringify(error)
    }
  }
}
