import type { AdminModel } from '@/services/admin'
import { reactive } from 'vue'

const _admin = reactive<{ value: AdminModel }>({
  value: {}
})

function setAdmin(admin: AdminModel) {
  // @ts-ignore: next-line
  sessionStorage.setItem('admin', JSON.stringify(admin))
  _admin.value = admin
}

function getAdmin() {
  if (_admin.value.id != undefined) return _admin.value
  // @ts-ignore: next-line
  else return JSON.parse(sessionStorage.getItem('admin'))
}

export {
  _admin,
  setAdmin,
  getAdmin
}