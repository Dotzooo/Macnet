<!-- eslint-disable no-new -->
<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'

import InitSketch from '~/scripts/home'
const mapStore = inject('mapStore')
const { updateHover } = mapStore

onMounted(() => {
  new InitSketch()
  initAnimate()
})

const tl = gsap.timeline({
  default: { duration: 0.6, ease: 'power2.inOut' }
})

function initAnimate () {
  tl.from('.slogan-title', { y: '-100%', opacity: 0 })
    .from(
      '.slogan-content',
      { y: '-100%', opacity: 0 },
      '+=1'
    )
}

</script>

<template>
  <main class="home">
    <section id="sketch" class="sketch" />
    <section class="slogan">
      <h2
        class="slogan-title"
        @mouseenter="updateHover(true)"
        @mouseout="updateHover(false)"
      >
        Some title for introduce ourSelf
      </h2>
      <h3
        class="slogan-content"
        @mouseenter="updateHover(true)"
        @mouseout="updateHover(false)"
      >
        This is some random text that will go initialy under the main title
      </h3>
    </section>
  </main>
</template>
