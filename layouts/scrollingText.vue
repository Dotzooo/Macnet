<script setup>
import { inject, onMounted } from 'vue'

const mapStore = inject('mapStore')
const { state, routeName } = mapStore

onMounted(() => {
  console.log('state:', state.routeName)
  console.log('routeName:', routeName)
})
</script>

<template>
  <section class="background">
    <span class="background-text">
      {{ state.routeName }}      {{ state.routeName }}
    </span>
    <!-- <span class="background-text background-text-delay">
      {{ state.routeName }}
    </span> -->
  </section>
</template>
