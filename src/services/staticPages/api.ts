import { axiosInstance } from "../axios";
import type { aboutUs } from "./entity";
export async function getFooter(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`footer`)
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function getAboutUs(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`aboutUs`)
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}

export async function putFooter(footer: { footer: {uz: string, eng: string}}) {
  try {
    const response = await axiosInstance({
      url: 'footer',
      method: 'PUT',
      data: footer,
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}

export async function putAboutUs(footer: aboutUs) {
  try {
    const response = await axiosInstance({
      url: 'aboutUs',
      method: 'PUT',
      data: footer,
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}
