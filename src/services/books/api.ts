import { axiosInstance } from "../axios";
import type { BookModel } from "./entity";
export async function getBooks(search = '', offset = 0, lang = 'uz'): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`books`, {
      params: {
        size: 8,
        offset: offset,
        search: search,
        lang: lang
      }
    }) as { data: {list: BookModel[], count: number} }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutBook(formInfo: BookModel, image: string) {
  try {
    const response = await axiosInstance({
      url: 'book',
      method: formInfo.id == undefined ? 'POST': 'PUT',
      data: {
        "id": formInfo.id,
        "slug": formInfo.slug,
        "name": formInfo.name,
        "title": formInfo.title,
        "description": formInfo.description,
        "image": `${image}`,
        "url": formInfo.url,
        "bookAuthor": formInfo.bookAuthor,
        "lang": formInfo.lang,
        "isActive": formInfo.isActive,
        "isDeleted": formInfo.isDeleted,
        "category": formInfo.category
      },
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}