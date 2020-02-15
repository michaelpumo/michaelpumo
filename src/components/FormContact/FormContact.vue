<template>
  <FormBase
    :loading="loading"
    @submit.prevent="submit">
    <!-- <FormField :label="`Checkboxes: ${checkboxes}`">
      <FormToggle
        id="checkbox1"
        v-model="checkboxes"
        toggle-value="Red"
        text="I am the text label"
        type="checkbox"
      />
      <FormToggle
        id="checkbox2"
        v-model="checkboxes"
        toggle-value="Blue"
        text="I am the text label"
        type="checkbox"
      />
      <FormToggle
        id="checkbox3"
        v-model="checkboxes"
        toggle-value="Green"
        text="I am the text label"
        type="checkbox"
      />
    </FormField>

    <FormField :label="`Radios: ${radios}`">
      <FormToggle
        id="radio1"
        v-model="radios"
        toggle-value="Red"
        text="I am the text label"
        type="radio"
      />
      <FormToggle
        id="radio2"
        v-model="radios"
        toggle-value="Blue"
        text="I am the text label"
        type="radio"
      />
      <FormToggle
        id="radio3"
        v-model="radios"
        toggle-value="Green"
        text="I am the text label"
        type="radio"
      />
    </FormField> -->

    <FormField
      id="name"
      label="Name">
      <FormInput
        id="name"
        v-model.trim="name"
        :validation="$v.name"
        placeholder="Tim Berners-Lee"
        @input="$v.name.$touch()"
      />
    </FormField>

    <FormField
      id="email"
      label="Email">
      <FormInput
        id="email"
        v-model.trim="email"
        :validation="$v.email"
        placeholder="hello@example.com"
        type="email"
        @input="$v.email.$touch()" />
    </FormField>

    <FormField
      id="company"
      label="Company">
      <FormInput
        id="company"
        v-model.trim="company"
        :validation="$v.company"
        placeholder="Google Inc."
        @input="$v.company.$touch()" />
    </FormField>

    <FormField
      id="message"
      label="Message">
      <FormInput
        id="message"
        v-model.trim="message"
        :validation="$v.message"
        placeholder="I heard you were the best!"
        type="textarea"
        @input="$v.message.$touch()" />
    </FormField>

    <FormField
      id="found"
      label="How did you find me?">
      <FormSelect
        id="found"
        v-model="found"
        :validation="$v.found"
        :selected="found"
        placeholder="How did you find me?"
        :options="[
          { value: 'colleagues', label: `We've worked together before` },
          { value: 'recommendation', label: `I was recommended by someone` },
          { value: 'search', label: `I found you through a search engine` },
          { value: 'social', label: 'I saw you on social media' },
        ]"
        @input="$v.found.$touch()" />
    </FormField>

    <ButtonInput
      :loading="loading"
      label="Send message"
      @click.native="submit" />
  </FormBase>
</template>

<script>
import axios from 'axios'
import {
  required,
  email
} from 'vuelidate/lib/validators'
import ButtonInput from '@/components/ButtonInput/ButtonInput.vue'
import {
  FormBase,
  FormField,
  FormInput,
  FormSelect
  // FormToggle
} from '@/components/Form'

export default {
  name: 'FormContact',
  class: 'FormContact',
  components: {
    ButtonInput,
    FormBase,
    FormField,
    FormInput,
    FormSelect
    // FormToggle
  },
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data() {
    return ({
      loading: false,
      checkboxes: [],
      radios: [],
      name: '',
      email: '',
      company: '',
      message: '',
      found: ''
    })
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    company: {
      required
    },
    message: {
      required
    },
    found: {
      required
    }
  },
  methods: {
    async submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.loading = true

      console.log('Submit form with AJAX here.')
      const send = await this.send()
      console.log(send)
    },
    async send() {
      try {
        return await axios({
          method: 'post',
          url: '/.netlify/functions/send-message',
          data: {
            name: this.name.trim(),
            email: this.email.trim(),
            company: this.company.trim(),
            message: this.message.trim(),
            found: this.found.trim()
          }
        })
      } catch (error) {
        return error
      }
    }
  }
}
</script>
