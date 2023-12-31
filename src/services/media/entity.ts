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
  seoTitle: string,
  seoMeta: string,
  seoDesc: string
}