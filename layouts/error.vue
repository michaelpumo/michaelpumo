<template>
  <main :class="$options.className">
    <div :class="`${$options.className}__container`">
      <h3 :class="`${$options.className}__heading`">
        {{ error.message }}
      </h3>
      <p>
        It looks like the page you arrived at has been removed or you may have
        followed a broken link. Please try using the menu to find what you're
        looking for.
      </p>
      <p>
        <NuxtLink to="/">Go to our home page</NuxtLink>
      </p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Error',
  className: 'Error',
  props: {
    error: {
      type: Object,
      default: () => ({
        message: 'An unexpected error occurred',
        statusCode: 500,
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.Error {
  $root: &;

  width: 100%;

  &__container {
    width: 100%;
    max-width: 700px;
    padding: 145px gap('sm');
  }

  &__heading {
    color: color('coral');
  }
}
</style>
