import type { TagModel } from './entity'

export * from './api'
export type { TagModel } from './entity'
export * from '../data'
export * from '../common'
export * from '../timeFunctions'
export * from '../category'

export function reset(obj: TagModel) {
  obj.id = undefined,
  obj.name = "",
  obj.lang = "",
  obj.articleCount = 0
}
