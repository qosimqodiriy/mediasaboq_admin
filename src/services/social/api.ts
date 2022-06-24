import { axiosInstance } from "../axios";
import type { Social, Form } from "./entity";
export async function getSocials(search = ''): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`socials`, {
      params: {
        search: search
      }
    }) as {data: {list: Social[], count: number}}
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutSocial(formInfo: Form, image: string) {
  try {
    const response = await axiosInstance({
      url: 'social',
      method: formInfo.id === undefined ? 'POST': 'PUT',
      data: {
        "id": formInfo.id,
        "icon": image,
        "priority": formInfo.priority,
        "url": formInfo.url,
      }
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}
