export interface AuthorModel {
  id?: number,
  username: string,
  password: string,
  token: string,
  uuid: string,
  name: string,
  image: string,
  description: string,
  isActive: boolean
}