import type { Category } from "../categories";
import type { Author } from "../types";

export interface ProjectModel {
  id?: number,
  date: number | null | string,
  type: number,
  lang: string,
  title: string,
  description: string,
  body: string,
  image: string,
  category: Category | null,
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