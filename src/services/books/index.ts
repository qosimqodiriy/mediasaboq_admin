import type { BookModel } from './entity'

export * from './api'
export * from './entity'

export function reset(book: BookModel) {
  book.name = ''
  book.image = ''
  book.title = ''
  book.description = ''
  book.bookAuthor = ''
  book.slug = ''
  book.category = {}
  book.isActive = false
  book.isDeleted = false
  book.url = ''
  book.lang = ''
}