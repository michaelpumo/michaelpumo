<template>
  <div :class="$options.className">
    <header :class="`${$options.className}__header`">
      <AppHero title="Hello. I’m a freelance user interface developer">
        <p>My name’s Michael Pumo. I craft user interfaces using modern frontend technologies like Vue.js, TypeScript, Storybook, GraphQL and JavaScript.</p>
      </AppHero>

      <AppFooter>
        <p>
          Find me at <a
            href="https://twitter.com/michaelpumo"
            target="_blank"
            rel="noopener">Twitter</a>, GitHub and LinkedIn. Have you found a bug?
        </p>
      </AppFooter>
    </header>

    <main :class="`${$options.className}__main`">
      <slot />
    </main>
  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>

<script>
import AppHero from '@/components/AppHero/AppHero.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'

export default {
  name: 'Layout',
  className: 'Layout',
  components: {
    AppHero,
    AppFooter
  }
}
</script>

<style lang="scss" scoped>
.Layout {
  // position: absolute;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  background-color: darkblue;

  @include media("lg") {
    // width: 50%;
    // height: ;
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: var(--spacing-unit);
    background-color: color("dark");
    color: var(--color-theme);

    @include media("lg") {
      position: fixed;
      top: 0;
      left: 0;
      width: 50%;
      height: 100vh;
    }
  }

  &__main {
    background-color: color("light");

    @include media("lg") {
      width: 50%;
      min-height: 100vh;
      margin-left: 50%;
    }
  }
}
</style>
