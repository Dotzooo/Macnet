import { reactive, computed } from 'vue'

const state = reactive({
  routeName: 'MACNET'
})

const updateRouteName = (name) => {
  state.routeName = name
}

const routeName = computed(() => {
  return state.routeName
})

// Cursor state
const isHover = reactive({
  enabled: false
})

const updateHover = (value) => {
  isHover.enabled = value
}

const hoverEnabled = computed(() => {
  return isHover.enabled
})

export default {
  state,
  updateRouteName,
  routeName,
  isHover,
  updateHover,
  hoverEnabled
}
