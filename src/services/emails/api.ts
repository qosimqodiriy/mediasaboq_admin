import { axiosInstance } from "../axios";
import type { EmailModel } from "./entity";
export async function getEmails(search = '', offset = 0): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`emails`, {
      params: {
        size: 10,
        offset: offset,
        search: search,
      }
    }) as { data: {list: EmailModel[], count: number} }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

