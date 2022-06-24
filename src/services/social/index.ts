import type { Form } from './entity'

export * from './api'
export type { Social, Form } from './entity'
export * from '../common'

export function reset(obj: Form) {
  obj.id = null,
  obj.icon = null,
  obj.priority = null,
  obj.url = null
}