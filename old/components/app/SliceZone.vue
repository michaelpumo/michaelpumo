<template>
  <article>
    <template v-for="(slice, index) in slices">
      <SliceClients
        v-if="slice.slice_type === 'clients'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceCode
        v-else-if="slice.slice_type === 'code'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceContact
        v-else-if="slice.slice_type === 'contact'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceImage
        v-else-if="slice.slice_type === 'image'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceProjects
        v-else-if="slice.slice_type === 'projects'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceQuotes
        v-else-if="slice.slice_type === 'quotes'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceText
        v-else-if="slice.slice_type === 'text'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
    </template>
  </article>
</template>

<script>
import { slugify } from '@/utils/helpers.js'
import SliceClients from '@/components/app/SliceClients.vue'
import SliceCode from '@/components/app/SliceCode.vue'
import SliceContact from '@/components/app/SliceContact.vue'
import SliceImage from '@/components/app/SliceImage.vue'
import SliceProjects from '@/components/app/SliceProjects.vue'
import SliceQuotes from '@/components/app/SliceQuotes.vue'
import SliceText from '@/components/app/SliceText.vue'

export default {
  name: 'SliceZone',
  className: 'SliceZone',
  components: {
    SliceClients,
    SliceCode,
    SliceContact,
    SliceImage,
    SliceProjects,
    SliceQuotes,
    SliceText,
  },
  props: {
    content: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    slices() {
      return this.content.map((item) => {
        if (item.primary && item.primary.id) {
          item.primary.id = slugify(item.primary.id)
        }
        return item
      })
    },
  },
}
</script>
