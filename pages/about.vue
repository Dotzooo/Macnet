<script setup>
import { inject, ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Collapse from '~/components/TheCollapse.vue'
import Contact from '~/components/TheContact.vue'
const imagesLoaded = require('imagesloaded')

gsap.registerPlugin(ScrollTrigger)

const mapStore = inject('mapStore')
const { updateHover } = mapStore

const about = ref(null)

onMounted(() => {
  imageScroll()
  gallery()
})

const envImages = reactive({
  images: [
    {
      // url: 'https://picsum.photos/id/10/300/500',
      url: 'https://images.pexels.com/photos/10324713/pexels-photo-10324713.jpeg?cs=srgb&dl=pexels-taha-samet-arslan-10324713.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w',
      description: ''
    },
    {
      // url: 'https://picsum.photos/id/10/300/500',
      url: 'https://images.pexels.com/photos/10533885/pexels-photo-10533885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940%20940w',
      description: ''
    },
    {
      // url: 'https://picsum.photos/id/10/300/500',
      url: 'https://images.pexels.com/photos/10253213/pexels-photo-10253213.jpeg?cs=srgb&dl=pexels-beepin-10253213.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w',
      description: ''
    }
    // {
    //   url: 'https://picsum.photos/id/10/500/500',
    //   description: ''
    // },
    // {
    //   url: 'https://picsum.photos/id/10/500/500',
    //   description: ''
    // }
  ]
})

function imageScroll () {
  const images = gsap.utils.toArray('img')
  imagesLoaded(images).on('always', scrollText)
}

function scrollText () {
  gsap.utils.toArray('.trigger-wrapper').forEach((section, index) => {
    const w = section.querySelector('.trigger-item')
    const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0]
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 1
      }
    })
  })
}

function gallery () {
  const additionalY = { val: 0 }
  let additionalYAnim
  let offset = 0
  const cols = gsap.utils.toArray('.col')

  cols.forEach((col, i) => {
    const images = col.childNodes

    // DUPLICATE IMAGES FOR LOOP
    images.forEach((image) => {
      const clone = image.cloneNode(true)
      col.appendChild(clone)
    })

    // SET ANIMATION
    images.forEach((item) => {
      const columnHeight = item.parentElement.clientHeight
      // Change direction for odd columns
      const direction = i % 2 !== 0 ? '+=' : '-='
      gsap.to(item, {
        y: direction + Number(columnHeight / 2),
        duration: 20,
        repeat: -1,
        ease: 'none',
        modifiers: {
          y: gsap.utils.unitize((y) => {
            if (direction === '+=') {
              offset += additionalY.val
              y = (parseFloat(y) - offset) % (columnHeight * 0.5)
            } else {
              offset += additionalY.val
              y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5)
            }
            return y
          })
        }
      })
    })
  })

  ScrollTrigger.create({
    trigger: '.environment-wrapper',
    start: 'top 50%',
    end: 'bottom 50%',
    onUpdate: function (self) {
      const velocity = self.getVelocity()
      if (velocity > 0) {
        if (additionalYAnim) { additionalYAnim.kill() }
        additionalY.val = -velocity / 2000
        additionalYAnim = gsap.to(additionalY, { val: 0 })
      }
      if (velocity < 0) {
        if (additionalYAnim) { additionalYAnim.kill() }
        additionalY.val = -velocity / 3000
        additionalYAnim = gsap.to(additionalY, { val: 0 })
      }
    }
  })
}
</script>

<template>
  <main id="about" ref="about" class="about">
    <h2 class="text-transparent">
      關於我們
    </h2>

    <article class="service-wrapper">
      <section class="service">
        <h2 class="text-transparent">
          服務項目
        </h2>
        <div class="service-title">
          <h3>{ Service }</h3>
          <h4>我們擁有多重技術整合的能力，為您提供最全面完整的解決方案</h4>
        </div>
        <div class="service-content">
          <span
            v-for="index in 3"
            :key="index"
            class="service-content_item"
            @mouseenter="updateHover(true)"
            @mouseout="updateHover(false)"
          >
            Service
          </span>
        </div>
        <div class="service-info">
          <div class="service-info_item">
            <Collapse title="顧問服務" content="顧問服務內容" />
          </div>
          <div class="service-info_item">
            <Collapse title="駐點人力" content="駐點人力內容" />
          </div>
          <div class="service-info_item">
            <Collapse title="專案合作" content="專案合作內容" />
          </div>
        </div>
      </section>
    </article>

    <article class="environment-wrapper">
      <section class="environment">
        <h2 class="text-transparent">
          合作對象
        </h2>
        <div class="environment-title">
          <div
            v-for="index in 3"
            :key="index"
            class="environment-title_item"
            @mouseenter="updateHover(true)"
            @mouseout="updateHover(false)"
          >
            Environment
          </div>
        </div>
        <div class="trigger-wrapper">
          <div class="trigger-item">
            <div v-for="(item,index) in envImages.images" :key="index" class="trigger-item_image">
              <img :src="item.url" :alt="item.description">
            </div>
          </div>
        </div>
        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="col">
              <div v-for="(item,index) in envImages.images" :key="index" class="image">
                <img :src="item.url" :alt="item.description">
              </div>
            </div>
            <div class="col">
              <div v-for="(item,index) in envImages.images" :key="index" class="image">
                <img :src="item.url" :alt="item.description">
              </div>
            </div>
            <div class="col">
              <div v-for="(item,index) in envImages.images" :key="index" class="image">
                <img :src="item.url" :alt="item.description">
              </div>
            </div>
          </div>
        </div>
        <div class="trigger-wrapper">
          <div class="trigger-item">
            <div v-for="(item,index) in envImages.images" :key="index" class="trigger-item_image">
              <img :src="item.url" :alt="item.description">
            </div>
          </div>
        </div>
      </section>
    </article>

    <article class="hiring-wrapper">
      <section class="hiring">
        <div class="hiring-content">
          <span
            v-for="index in 3"
            :key="index"
            class="hiring-content_item"
            @mouseenter="updateHover(true)"
            @mouseout="updateHover(false)"
          >
            Hiring
          </span>
        </div>
        <div class="hiring-info">
          <div class="hiring-info_item">
            <Collapse title="後端" content="後端內容" />
          </div>
          <div class="hiring-info_item">
            <Collapse title="前端" content="前端內容" />
          </div>
          <div class="hiring-info_item">
            <Collapse title="全端" content="全端內容" />
          </div>
        </div>
      </section>
    </article>

    <article class="copartnership-wrapper">
      <section class="copartnership">
        <h2 class="text-transparent">
          合作對象
        </h2>
        <div class="copartnership-content">
          <div
            v-for="index in 3"
            :key="index"
            class="copartnership-content_item"
            @mouseenter="updateHover(true)"
            @mouseout="updateHover(false)"
          >
            Cooperative
          </div>
        </div>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, ea laborum cum quas quos animi cupiditate enim aspernatur pariatur officiis quo! Iusto vero, voluptas distinctio quaerat sequi nostrum eveniet quod.</p>
      </section>
    </article>

    <Contact />
  </main>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex: row;
  li {
    list-style-type: none;
    margin: 20px;
  }
}
</style>
