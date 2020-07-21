<template>
  <div>
    <template v-for="(slice, index) in slices">
      <SliceClients
        v-if="slice.type === 'clients'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceContact
        v-else-if="slice.type === 'contact'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceImage
        v-else-if="slice.type === 'image'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceProjects
        v-else-if="slice.type === 'projects'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceQuotes
        v-else-if="slice.type === 'quotes'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
      <SliceText
        v-else-if="slice.type === 'text'"
        :id="slice.primary.id"
        :key="index"
        :slice="slice"
      />
    </template>
  </div>
</template>

<script>
import { slugify } from '@/utils/helpers'
import SliceClients from '@/components/SliceClients/SliceClients.vue'
import SliceContact from '@/components/SliceContact/SliceContact.vue'
import SliceImage from '@/components/SliceImage/SliceImage.vue'
import SliceProjects from '@/components/SliceProjects/SliceProjects.vue'
import SliceQuotes from '@/components/SliceQuotes/SliceQuotes.vue'
import SliceText from '@/components/SliceText/SliceText.vue'

export default {
  name: 'SliceZone',
  className: 'SliceZone',
  components: {
    SliceClients,
    SliceContact,
    SliceImage,
    SliceProjects,
    SliceQuotes,
    SliceText
  },
  props: {
    content: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    slices() {
      return this.content.map(item => {
        if (item.primary && item.primary.id) {
          item.primary.id = slugify(item.primary.id)
        }
        return item
      })
    }
  }
}
</script>
