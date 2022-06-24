import type { Category } from "../types";

export interface BookModel {
  id?: number,
  slug: string,
  name: string,
  title: string,
  description: string,
  image: string,
  url: string,
  bookAuthor: string,
  lang: string,
  isActive: boolean,
  isDeleted: boolean,
  category: Category
}