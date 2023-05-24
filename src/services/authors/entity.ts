export interface AuthorModel {
  id?: number,
  username: string,
  password: string,
  image: string,
  name: string,
  description: string,
  token: string,
  uuid: string,
  isActive: boolean
}