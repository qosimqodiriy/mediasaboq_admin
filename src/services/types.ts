export interface Category {
  id?: number,
  name?: string,
  lang?: string,
  articleCount?: number,
  type?: number,
  slug?: string,
  image?: string
}

export interface Author {
  id: number,
  username?: string,
  password?: string,
  token?: string,
  uuid?: string,
  name?: string,
  image?: string,
  description?: string,
  isActive?: boolean
}