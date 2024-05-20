export interface Category {
  id: number
  name: string
  slug: string
  description: string
  [key: string]: any
}

export interface CategoryCreatePayload {
  name: string
  description: string
  slug: string
}

export interface CategoryUpdatePayload extends CategoryCreatePayload {
  id: number
}
