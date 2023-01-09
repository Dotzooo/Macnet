<script setup>
import { ref } from 'vue'

const collapseStatus = ref(false)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})

function collapse () {
  collapseStatus.value = !collapseStatus.value
}
</script>

<template>
  <section class="collapse">
    <h3 class="collapse-title" @click="collapse">
      <button class="collapse-button">
        <span class="collapse-button_title">
          {{ props.title }}
          <span v-if="collapseStatus" class="collapse-button_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </span>
          <span v-else class="collapse-button_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </span>
        </span>
      </button>
    </h3>
    <transition name="collapse">
      <div v-if="collapseStatus" class="collapse-content">
        <p>
          {{ content }}
        </p>
      </div>
    </transition>
  </section>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/components/collapse.scss"
</style>
