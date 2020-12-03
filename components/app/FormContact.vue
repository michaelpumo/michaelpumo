<template>
  <div :class="$options.className">
    <div v-if="status === 'success'" :class="`${$options.className}__message`">
      <h3>Message sent</h3>
      <p>
        I'll be in touch shortly. In the meantime you can reach out to me on
        <a href="https://twitter.com/michaelpumo" target="_blank" rel="noopener"
          >Twitter</a
        >
        or
        <a
          href="https://www.linkedin.com/in/michaelpumo/"
          target="_blank"
          rel="noopener"
          >LinkedIn</a
        >.
      </p>
      <p>
        <ImageLazy
          :class="`${$options.className}__image`"
          src="/icons/icon-working.png"
          width="60"
          height="60"
          alt="Message sent"
        />
      </p>
      <ButtonInput label="Back to form" @click.native="reset" />
    </div>

    <div v-if="status === 'error'" :class="`${$options.className}__message`">
      <h3>Unexpected error</h3>
      <p>
        Something went a bit awry. Could you reach out to me on
        <a href="https://twitter.com/michaelpumo" target="_blank" rel="noopener"
          >Twitter</a
        >
        or
        <a
          href="https://www.linkedin.com/in/michaelpumo/"
          target="_blank"
          rel="noopener"
          >LinkedIn</a
        >?
      </p>
      <p>
        <ImageLazy
          :class="`${$options.className}__image`"
          src="/icons/icon-facepalm.png"
          width="60"
          height="60"
          alt="Unexpected error"
        />
      </p>
      <ButtonInput label="Let's try again?" @click.native="attempt" />
    </div>

    <FormBase v-if="!status.length" :loading="loading" @submit.prevent="submit">
      <FormField id="name" label="Name">
        <FormInput
          id="name"
          v-model.trim="name"
          :validation="$v.name"
          placeholder="Tim Berners-Lee"
          @input="$v.name.$touch()"
        />
      </FormField>

      <FormField id="email" label="Email">
        <FormInput
          id="email"
          v-model.trim="email"
          :validation="$v.email"
          placeholder="hello@example.com"
          type="email"
          @input="$v.email.$touch()"
        />
      </FormField>

      <FormField id="company" label="Company">
        <FormInput
          id="company"
          v-model.trim="company"
          :validation="$v.company"
          placeholder="Google Inc."
          @input="$v.company.$touch()"
        />
      </FormField>

      <FormField
        v-if="type === 'booking' || type === 'quote'"
        id="budget"
        label="Budget"
      >
        <FormInput
          id="budget"
          v-model.trim="budget"
          :validation="$v.budget"
          placeholder="£5,000 – £8,000"
          @input="$v.budget.$touch()"
        />
      </FormField>

      <FormGroup v-if="type === 'booking' || type === 'quote'" :columns="2">
        <FormField id="start" label="Start date">
          <FormInput
            id="start"
            v-model.trim="start"
            :validation="$v.start"
            placeholder="02/10/2083"
            type="date"
            @input="$v.start.$touch()"
          />
        </FormField>

        <FormField id="end" label="End date">
          <FormInput
            id="end"
            v-model.trim="end"
            :validation="$v.end"
            placeholder="02/10/2084"
            type="date"
            @input="$v.end.$touch()"
          />
        </FormField>
      </FormGroup>

      <FormField id="message" label="Message">
        <FormInput
          id="message"
          v-model.trim="message"
          :validation="$v.message"
          placeholder="I heard you were the best!"
          type="textarea"
          @input="$v.message.$touch()"
        />
      </FormField>

      <FormField id="found" label="How did you find me?">
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
          @input="$v.found.$touch()"
        />
      </FormField>

      <FormField id="agree" label="We're good" a11y>
        <FormCheckbox
          id="agree"
          v-model="agree"
          :validation="$v.agree"
          value="Agree"
          text="I agree to be a nice and kind person!"
          @change="$v.agree.$touch()"
        />
      </FormField>

      <ButtonInput
        :loading="loading"
        label="Send message"
        @click.native="submit"
      />
    </FormBase>
  </div>
</template>

<script>
import axios from 'axios'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import ButtonInput from '@/components/app/ButtonInput.vue'
import {
  FormBase,
  FormCheckbox,
  FormField,
  FormGroup,
  FormInput,
  FormSelect,
} from '@/components/app/Form'
import ImageLazy from '@/components/app/ImageLazy.vue'

export default {
  name: 'FormContact',
  className: 'FormContact',
  components: {
    ButtonInput,
    FormBase,
    FormCheckbox,
    FormField,
    FormGroup,
    FormInput,
    FormSelect,
    ImageLazy,
  },
  props: {
    type: {
      type: String,
      default: 'question',
      validator(value) {
        return ['booking', 'quote', 'question'].includes(value)
      },
    },
  },
  data: () => ({
    loading: false,
    status: '',
    name: '',
    email: '',
    company: '',
    message: '',
    found: '',
    agree: true,
    budget: '',
    start: '',
    end: '',
  }),
  validations() {
    const fields = {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      company: {
        required,
      },
      message: {
        required,
      },
      found: {
        required,
      },
      agree: {
        sameAs: sameAs(() => true),
      },
    }

    if (this.type === 'booking' || this.type === 'quote') {
      return {
        ...fields,
        ...{
          budget: {
            required,
          },
          start: {
            required,
          },
          end: {
            required,
          },
        },
      }
    }

    return fields
  },
  methods: {
    async submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.loading = true

      const send = await this.send()

      if (send.status === 200) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }

      this.loading = false
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
            found: this.found.trim(),
            budget: this.budget.trim() || 'n/a',
            start: this.start.trim() || 'n/a',
            end: this.end.trim() || 'n/a',
          },
        })
      } catch (error) {
        return error
      }
    },
    reset() {
      this.name = ''
      this.email = ''
      this.company = ''
      this.message = ''
      this.found = ''
      this.status = ''
      this.budget = ''
      this.start = ''
      this.end = ''

      this.$v.$reset()
    },
    attempt() {
      this.status = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormContact {
  $root: &;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;

  &__message {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  &__image {
    width: 80px;
    height: 80px;
  }
}
</style>
