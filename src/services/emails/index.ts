import type { EmailModel } from './entity'

export * from './api'
export type { EmailModel } from './entity'
export * from '../data'
export * from '../common'
export * from '../timeFunctions'
export * from '../category'

export function reset(obj: EmailModel) {
  obj.url = ''
}
