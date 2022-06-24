import { axiosInstance } from "../axios";
import type { Category } from "./entity";
export async function getCategories(type = 1,search = '', offset = 0, lang = ''): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`categories`, {
      params: {
        size: 12,
        offset: offset,
        search: search,
        type: type,
        lang: lang
      }
    }) as { data: {list: Category[], count: number} }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutCategory(formInfo: Category, image: string) {
  try {
    const response = await axiosInstance({
      url: 'category',
      method: formInfo.id == undefined ? 'POST': 'PUT',
      data: {
        "id": formInfo.id,
        "name": formInfo.name,
        "lang": formInfo.lang,
        "type": formInfo.type,
        "slug": formInfo.slug,
        "image": `${image}`,
        "articleCount": formInfo.articleCount
      },
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}
