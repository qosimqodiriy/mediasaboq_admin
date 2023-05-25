import type { ProjectModel } from '../project'
import type { MediaModel } from './entity'
export * from './api'
export * from './entity'

export function resetMedia(form: MediaModel) {
  form.type = 1
  form.title = ''
  form.lang = ''
  form.description = ''
  form.body = ''
  form.image = ''
  form.category = {},
  form.isTop = false,
  form.isMain = false,
  form.author = {},
  form.active = false,
  form.date = null,
  form.credit = '',
  form.slug = '',
  form.seoTitle = '',
  form.seoMeta = '',
  form.seoDesc = ''
}

export function resetEducation(form: MediaModel) {
  form.type = 2
  form.title = ''
  form.lang = ''
  form.description = ''
  form.body = ''
  form.image = ''
  form.category = {},
  form.isTop = false,
  form.isMain = false,
  form.author = {},
  form.active = false,
  form.date = null,
  form.credit = '',
  form.slug = '',
  form.seoTitle = '',
  form.seoMeta = '',
  form.seoDesc = ''
}

export function resetProject(form: ProjectModel) {
  form.type = 3
  form.title = ''
  form.lang = ''
  form.description = ''
  form.body = ''
  form.image = ''
  form.category = null,
  form.isTop = false,
  form.isMain = false,
  form.author = {},
  form.active = false,
  form.date = null,
  form.credit = '',
  form.slug = '',
  form.seoTitle = '',
  form.seoMeta = '',
  form.seoDesc = ''
}