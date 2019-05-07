import validate from '../validation'
import notification from '../notification'

function success (form, data) {
  form.classList.remove('is-loading')

  if (data && data.hasOwnProperty('ok')) {
    if (data.ok === true) {
      notification('Message successfully sent', 'Thanks and I\'ll be in touch soon', '🚀')
      form.reset()
      return
    }
  }

  notification('Error', 'Something went wrong. Try again!', '🙈')
}

function fail (form, error) {
  form.classList.remove('is-loading')
  notification('Error', `${error.toString()}`, '🙈')
}

function send (form) {
  const action = form.getAttribute('action')
  const name = form.querySelector('#form-name')
  const email = form.querySelector('#form-email')
  const message = form.querySelector('#form-message')

  return fetch(action, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      message: message.value
    })
  })
}

function validates (form) {
  const validation = validate(form)
  return validation.isValid
}

function init () {
  const form = document.querySelector('#form')

  // Run validation and if successfull, post the form.
  form.addEventListener('submit', e => {
    e.preventDefault()
    if (validates(form)) {
      form.classList.add('is-loading')
      send(form)
        .then(response => response.json())
        .then(data => success(form, data))
        .catch(error => fail(form, error))
    }
  })

  // Run validation only if form has a history of failed validation.
  form.addEventListener('keyup', () => {
    if (form.classList.contains('has-error-history')) {
      validates(form)
    }
  })
}

export default init
