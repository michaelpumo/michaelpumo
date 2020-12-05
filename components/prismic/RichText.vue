<template>
  <component
    :is="type"
    :class="[$options.className, breakClass]"
    v-html="content"
  />
</template>

<script>
import PrismicDOM from 'prismic-dom'
import { linkResolver, replaceAll } from '@/utils/helpers.js'

export default {
  name: 'PrismicRichtext',
  className: 'PrismicRichtext',
  props: {
    type: {
      type: String,
      default: 'div',
    },
    html: {
      type: Array,
      required: true,
    },
    brOff: {
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'xxs',
          'xxsMax',
          'xs',
          'xsMax',
          'sm',
          'smMax',
          'md',
          'mdMax',
          'lg',
          'lgMax',
          'xl',
          'xlMax',
          'xxl',
          'xxlMax',
          'xxxl',
          'xxxlMax',
        ].includes(value)
      },
    },
  },
  data: () => ({
    PrismicDOM,
  }),
  computed: {
    breakClass() {
      return this.brOff.length ? `br-off-${this.brOff}` : null
    },
    content() {
      const html = PrismicDOM.RichText.asHtml(this.html, linkResolver)
      const coded = replaceAll(
        replaceAll(html, '<pre>', '<pre><code class="language-javascript">'),
        '</pre>',
        '</code></pre>'
      )

      return coded
    },
  },
  methods: {
    linkResolver,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.PrismicRichtext {
  @each $key, $value in $breakpoints {
    &.br-off-#{$key} {
      &::v-deep {
        br {
          @include media($key) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
