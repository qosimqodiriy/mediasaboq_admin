import { axiosInstance } from "../axios";
import type { AuthorModel } from "./entity";
export async function getAuthors(search = '', offset = 0): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`authors`, {
      params: {
        size: 12,
        offset: offset,
        search: search
      }
    }) as {data: {list: AuthorModel[], count: number}}
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutAuthor(formInfo: AuthorModel, image: string) {
  try {
    const response = await axiosInstance({
      url: 'author',
      method: formInfo.id === undefined ? 'POST': 'PUT',
      data: {
        "id": formInfo.id,
        "username": formInfo.username,
        "name": formInfo.name,
        "isActive": formInfo.isActive,
        "description": formInfo.description,
        "image": `${image}`,
        "password": formInfo.password,
        "uuid": formInfo.uuid,
        "token": formInfo.token
      }
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}