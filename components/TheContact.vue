<script setup>
import { ref, reactive } from 'vue'

const servicesList = reactive({
  services: [
    {
      name: '顧問服務',
      description: ''
    },
    {
      name: '駐點人力',
      description: ''
    },
    {
      name: '專案合作',
      description: ''
    }
  ]
})

const name = ref('')
const email = ref('')
const company = ref('')
const message = ref('')

</script>

<template>
  <article class="contact">
    <section class="contact-pic">
      <img src="../assets/Workflow.png" alt="聯絡我們">
    </section>
    <section class="contact-content">
      <div class="contact-content_services">
        <div class="contact_services__buttons">
          <button v-for="(item, index) in servicesList.services" :key="index" role="button" class="contact_services__button">
            {{ item.name }}
          </button>
        </div>
        <form class="contact_services__form">
          <div class="field">
            <label for="Name">Name</label>
            <input id="Name" v-model="name" type="text">
          </div>
          <div class="field">
            <label for="Email">Email</label>
            <input id="Email" v-model="email" type="text">
          </div>
          <div class="field">
            <label for="Company">Company's name( Optional )</label>
            <input id="Company" v-model="company" type="text">
          </div>
          <div class="field">
            <label for="Message">Your message</label>
            <textarea id="Message" v-model="message" type="text" />
          </div>
        </form>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/components/contact.scss"
</style>
