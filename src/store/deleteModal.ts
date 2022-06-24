import { reactive } from 'vue'

const _deleteModal = reactive({
    visible: false,
    text: '',
    title: '',
    url: '',
    id: 0,
    callback: () => {}
})

function OPEN_DELETE_MODAL(params: {text: string, title: string, url: string, id: number, callback?: () => void }) {
    _deleteModal.visible = true
    _deleteModal.text = params.text
    _deleteModal.title = params.title
    _deleteModal.url = params.url
    _deleteModal.id = params.id
    // @ts-ignore:next-line
    _deleteModal.callback = params.callback
}

function CLOSE_DELETE_MODAL() {
    _deleteModal.visible = false
    _deleteModal.id = 0
    _deleteModal.text = ''
    _deleteModal.url = ''
    _deleteModal.title = ''
    _deleteModal.callback()
}

function CLOSE_DELETE() {
    _deleteModal.visible = false
    _deleteModal.id = 0
    _deleteModal.text = ''
    _deleteModal.url = ''
    _deleteModal.title = ''
}
export {
    _deleteModal,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,
    CLOSE_DELETE
}
