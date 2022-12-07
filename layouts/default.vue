<script setup>
import { ref, onMounted, provide } from 'vue'

// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import LocomotiveScroll from 'locomotive-scroll'

import TheHeader from '~/layouts/TheHeader.vue'
// import ScrollingText from '~/layouts/scrollingText.vue'
import store from '~/store/index.js'

provide('mapStore', store)

const cursor = ref(null)
const scrollContainer = ref(null)

// const scroller = computed(() => {
//   return document.scrollingElement
// })

function cursorMove (e) {
  const x = e.pageX
  const y = e.pageY
  cursor.value.style.left = x - 15 + 'px'
  cursor.value.style.top = y - 15 + 'px'
}

function onSroll () {
  // const ts = document.querySelector('[data-scroll-container]')
  // console.log(ts)
  // console.log(scrollContainer)
  // const scroller = new LocomotiveScroll({
  //   el: scrollContainer,
  //   smooth: true
  // })
  // console.log(scroller)
  // console.log(document.querySelector('[data-scroll-container]'))
  // gsap.registerPlugin(ScrollTrigger)

  // locoScroll.on('scroll', ScrollTrigger.update)
}

onMounted(() => {
  onSroll()
})

</script>

<template>
  <div ref="scrollContainer" class="wrapper smooth-scroll" data-scroll-container @mousemove="cursorMove($event)">
    <div class="container">
      <TheHeader />
      <!-- <ScrollingText /> -->
      <Nuxt />
    </div>
    <div
      ref="cursor"
      class="cursor"
      :class="{ active: store.isHover.enabled }"
    />
  </div>
</template>
