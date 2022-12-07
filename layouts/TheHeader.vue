<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// const mapStore = inject('mapStore')
// const { updateHover } = mapStore

const menu = ref(null)

const navList = [
  {
    url: '#',
    path: 'about',
    name: ':About',
    nameTw: ': 關於我們'
  },
  {
    url: '#',
    path: 'service',
    name: ':Service',
    nameTw: ': 服務項目'
  },
  {
    url: '#',
    path: 'partnership',
    name: ':Partnership',
    nameTw: ': 合作對象'
  },
  {
    url: '#',
    path: 'profile',
    name: ':Profile',
    nameTw: ': 簡介'
  },
  {
    url: '#',
    path: 'contact',
    name: ':Contact',
    nameTw: ': 聯絡我們'
  }
]

const tl = gsap.timeline({ default: { paused: true, ease: 'Bounce' } })

onMounted(() => {
  animateOpenMenu()
})

function openMenu () {
  tl.reversed(!tl.reversed())
}

function animateOpenMenu () {
  tl.to('.toggle-btn_one', { y: 6, rotation: '45', duration: 0.8 })
  tl.to('.toggle-btn_two', { y: -6, rotation: '-45', duration: 0.8 }, '-=0.8')
  tl.to('.menu', { top: '0%', clipPath: 'circle(100%)', duration: 1 }, '-=1')
  tl.from('.menu ul li', { x: -200, stagger: 0.2, duration: 1, opacity: 0 })
    .reverse()
}
</script>

<template>
  <header
    class="header"
  >
    <nuxt-link
      to="/"
      class="header-logo"
    >
      MACNET
    </nuxt-link>

    <div
      class="toggle-btn"
      @click="openMenu()"
    >
      <span ref="one" class="toggle-btn_one" />
      <span ref="two" class="toggle-btn_two" />
    </div>

    <nav ref="menu" class="menu">
      <h1 class="text-transparent">
        悅慶資訊 | MACNET Technology | 網頁設計 | 人才派遣
      </h1>
      <section class="menu-content">
        <ul class="menu-content_list">
          <h2 class="text-transparent">
            服務項目
          </h2>
          <li
            v-for="(item, key) in navList"
            :key="key"
          >
            <nuxt-link
              :to="{ name: item.path }"
              @click="closeMenu()"
            >
              <h3 class="link-title">
                {{ item.nameTw }}
              </h3>
            </nuxt-link>
          </li>
        </ul>
        <div class="menu-content_info">
          <h2 class="text-transparent">
            聯絡資訊
          </h2>
          <h3>
            <address>
              <a
                href="mailto:MACNET@MACNET.com"
                target="_blank"
              >MACNET@MACNET.com</a>
            </address>
          </h3>
          <h3>
            <a
              href="tel:+886-2-27181248"
              target="_blank"
            >886-2-2718-1248</a>
          </h3>
          <h3>台北市松山區南京東路五段16號11號樓之3</h3>
        </div>
      </section>
    </nav>
  </header>
</template>
