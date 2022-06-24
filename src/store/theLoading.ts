import { reactive } from 'vue'

const _loading = reactive({
    visible: false,
})

function OPEN_LOADING_MODAL() {
    _loading.visible = true
}

function CLOSE_LOADING_MODAL() {
    _loading.visible = false
}

export {
  _loading,
  CLOSE_LOADING_MODAL,
  OPEN_LOADING_MODAL
}
