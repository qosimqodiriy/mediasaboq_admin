import type { Category, Author } from "../types";

export interface MediaModel {
  id?: number,
  date: number | null | string,
  type: number,
  lang: string,
  title: string,
  description: string,
  body: string,
  image: string,
  category: Category,
  tags: any[],
  suggests: any[],
  isTop: boolean,
  isMain: boolean,
  author: Author,
  slug: string,
  credit: string,
  active: boolean,
  deleted: boolean,
  seoTitle: string,
  seoMeta: string,
  seoDesc: string
}

interface thisCategory {
  id?: number,
  name?: string,
  lang?: string,
  type?: number,
  slug?: string,
  image?: string
  articleCount?: number,
}

interface thisAuthor {
  id?: number,
  username?: string,
  password?: string,
  token?: string,
  uuid?: string,
  name?: string,
  image?: string,
  description?: string,
  isActive?: boolean
}