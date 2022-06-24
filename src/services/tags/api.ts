import { axiosInstance } from "../axios";
import type { TagModel } from "./entity";
export async function getTags(lang='uz', search = '', offset = 0): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`tags`, {
      params: {
        size: 10,
        offset: offset,
        search: search,
        lang: lang
      }
    }) as { data: {list: TagModel[], count: number} }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutTag(formInfo: TagModel) {
  try {
    const response = await axiosInstance({
      url: 'tag',
      method: formInfo.id == undefined ? 'POST': 'PUT',
      data: formInfo,
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}
