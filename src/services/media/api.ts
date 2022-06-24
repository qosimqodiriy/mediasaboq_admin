import { axiosInstance } from "../axios";
import { epoch } from "../timeFunctions";
import type { MediaModel } from "./entity";
export async function getMedias(search = '', offset = 0, type: number, lang = 'uz'): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`articles`, {
      params: {
        size: 6,
        offset: offset,
        search: search,
        type: type,
        lang: lang
      }
    }) as { data: { list: MediaModel[], count: number } }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function getMedia(id = 0): Promise<any[]> {
  try {
    const response = await axiosInstance.get(`article?id=${id}`, {
    }) as { data: MediaModel }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutMedia(formInfo: MediaModel, image: string) {
  try {
    const response = await axiosInstance({
      url: 'article',
      method: formInfo.id == undefined ? 'POST': 'PUT',
      data: {
        "id": formInfo.id,
        "type": formInfo.type,
        "slug": formInfo.slug,
        "body": formInfo.body,
        "title": formInfo.title,
        "description": formInfo.description,
        "image": `${image}`,
        "credit": formInfo.credit,
        "active": formInfo.active,
        "deleted": formInfo.deleted,
        "date": epoch(String(formInfo.date)),
        "seoTitle": formInfo.seoTitle,
        "seoMeta": formInfo.seoMeta,
        "seoDesc": formInfo.seoDesc,
        "author": { id: formInfo.author },
        "lang": formInfo.lang,
        "isTop": formInfo.isTop,
        "isMain": formInfo.isMain,
        "category": { id: formInfo.category },
        "tags": formInfo.tags,
        "suggests": formInfo.suggests
      },
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}