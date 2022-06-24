import { reactive } from 'vue'

const _toast = reactive({
  visible: false,
  text: '',
  callback: () => {}
})

function OPEN_NOTIFICATION(params: { text: string, callback: () => void }) {
  _toast.callback = params.callback
  _toast.callback()
  _toast.visible = true
  _toast.text = params.text
  setTimeout(() => {
    _toast.visible = false,
    _toast.text = ''
  }, 4000)
}

export {
  _toast,
  OPEN_NOTIFICATION
}
