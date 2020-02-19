<template>
  <ErrorLayout>
    <div :class="`${$options.className}__message`">
      <h3>Page not found</h3>
      <p>
        Something went a bit awry. Could you reach out to me on
        <a
          href="https://twitter.com/michaelpumo"
          target="_blank"
          rel="noopener">Twitter</a> or
        <a
          href="https://www.linkedin.com/in/michaelpumo/"
          target="_blank"
          rel="noopener">LinkedIn</a>?
      </p>
      <p>
        <ImageLazy
          :class="`${$options.className}__image`"
          src="/icons/icon-facepalm.png"
          width="60"
          height="60"
          alt="Page not found" />
      </p>
      <ButtonInput
        label="Get me out of here!"
        :route="{ path: '/' }" />
    </div>
  </ErrorLayout>
</template>

<script>
import ErrorLayout from '@/layouts/ErrorLayout.vue'
import ButtonInput from '@/components/ButtonInput/ButtonInput.vue'
import ImageLazy from '@/components/ImageLazy/ImageLazy'

export default {
  name: 'Page404',
  className: 'Page404',
  components: {
    ErrorLayout,
    ButtonInput,
    ImageLazy
  }
}
</script>

<style lang="scss" scoped>
.Page404 {
  $root: &;

  &__message {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
}
</style>
