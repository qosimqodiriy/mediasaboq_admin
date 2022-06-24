import type { AuthorModel } from './entity'

export * from './api'
export type { AuthorModel } from './entity'
export * from '../data'
export * from '../common'
export * from '../timeFunctions'
export * from '../category'

export function reset(obj: AuthorModel) {
    obj.id = undefined,
    obj.image = '',
    obj.name = '',
    obj.username = '',
    obj.description = '',
    obj.isActive = false,
    obj.uuid = '',
    obj.password = '',
    obj.token = ''
}