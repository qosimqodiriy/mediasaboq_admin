import type { Category } from './entity'

export * from './api'
export type { Category } from './entity'
export * from '../data'
export * from '../common'
export * from '../timeFunctions'
export * from '../category'

export function reset(obj: Category) {
  obj.id = undefined,
  obj.name = "",
  obj.lang = "",
  obj.articleCount = 0,
  obj.image = ""
  obj.slug = "",
  obj.type = 0
}
