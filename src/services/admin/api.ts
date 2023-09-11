import type { AdminModel } from "./entity"
import { axiosInstance } from "../axios";

export async function putAdmin(admin: AdminModel) {
  try {
    const response = await axiosInstance({
      url: 'admin/password',
      method: 'PUT',
      data: admin,
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}