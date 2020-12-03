<template>
  <ul
    v-if="validation.$invalid && validation.$dirty"
    :class="$options.className"
  >
    <li
      v-for="message in messages"
      :key="message.type"
      :class="`${$options.className}__message`"
    >
      {{ message.message }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FormValidation',
  className: 'FormValidation',
  props: {
    validation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    messages() {
      const validation = { ...this.validation }
      const formatted = Object.keys(validation.$params)
        .filter(
          (item) =>
            Object.prototype.hasOwnProperty.call(validation, item) &&
            !validation[item]
        )
        .map((item) => this.getMessage(item, validation.$params[item]))

      return formatted
    },
  },
  methods: {
    getMessage(name, item) {
      let message = ''

      if (item === null) {
        item = {
          type: name,
        }
      }

      if (
        item instanceof Object &&
        !Object.prototype.hasOwnProperty.call(item, 'type')
      ) {
        item.type = name
      }

      switch (item.type) {
        case 'required':
          message = 'This field is required'
          break
        case 'email':
          message = 'Must be a valid email'
          break
        case 'minLength':
          message = `Must have at least ${item.min} characters`
          break
        case 'maxLength':
          message = `Must be no more than ${item.max} characters`
          break
        case 'number':
          message = 'This field can only contain numbers'
          break
        case 'sameAs':
          message = 'This field is required'
          break
        case 'alphaNum':
          message = 'Can only contain letters and numbers'
          break
        case 'validatePassword':
          message = 'Password is not secure enough'
          break
        default:
          message = 'Field is invalid'
      }

      item.message = message

      return item
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormValidation {
  width: 100%;
  margin: 0;

  &__message {
    @include error;
  }
}
</style>
