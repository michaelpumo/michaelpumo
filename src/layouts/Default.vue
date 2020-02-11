<template>
  <div :class="$options.className">
    <header>
      <h1>Hello. I’m a freelance user interface developer</h1>
      <p>My name’s Michael Pumo. I craft user interfaces using modern frontend technologies like Vue.js, TypeScript, Storybook, GraphQL and JavaScript.</p>
    </header>

    <main>
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
export default {
  name: 'Layout',
  className: 'Layout'
}
</script>

<style>
</style>
