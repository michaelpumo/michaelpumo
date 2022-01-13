<template>
  <ul role="list">
    <li v-for="item in lists" :key="item.id" class="p-4 m-4 shadow-lg">
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts">
interface links {
  id: number
  title: string
}

export default {
  setup() {
    const lists = ref<links[]>([
      { id: 1, title: 'About' },
      { id: 2, title: 'Work' },
      { id: 3, title: 'Articles' },
      { id: 4, title: 'Contact' },
    ])

    return {
      lists,
    }
  },
}
</script>
