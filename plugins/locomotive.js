import LocomotiveScroll from 'locomotive-scroll'
import Vue from 'vue'

function install () {
  Object.defineProperty(Vue.prototype, 'LocomotiveScroll', {
    value: LocomotiveScroll
  })
}

install()
