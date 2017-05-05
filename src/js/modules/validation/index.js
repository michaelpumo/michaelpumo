import 'validatinator';

function validate(form) {
  const validator = new window.Validatinator({
    'contact-form': {
      'fullname': 'required',
      'email': 'required|email',
      'message': 'required'
    },
  }, {
    'contact-form': {
      'fullname': {
        'required': 'Name is required.'
      },
      'email': {
        'required': 'Email address is required.',
        'email': 'Email must be in a valid format.'
      },
      'message': {
        'required': 'Message is required.'
      },
    },
  });

  const formName = form.getAttribute('name');
  const allFields = form.querySelectorAll('[name]');

  // Clear any existing error messages from all form fields.
  Array.from(allFields).forEach(field => field.classList.remove('has-error'));

  if (validator.fails(formName)) {
    const errors = validator.errors[formName];

    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const obj = errors[key];
        const selector = `[name='${key}']`;
        const field = form.querySelector(selector);

        for (const prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            field.classList.add('has-error');
            form.classList.add('has-error-history');
            // field.insertAdjacentHTML('afterend', `<p class="c-form__message">${obj[prop]}</p>`);
          }
        }
      }
    }
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
}

export default validate;
