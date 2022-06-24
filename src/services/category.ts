import { axiosInstance } from "./axios";
import type { Category, Author } from "./types";
export async function getCategory(type: number | null): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`categories`, {
      params: {
        type: type
      }
    }) as { data: { list: Category[], count: number } }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function getAuthorsSelect(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`authors`, {
      
    }) as { data: { list: Author[], count: number } }
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}
