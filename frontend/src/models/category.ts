import { ProductResponse } from './product'

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  products?: ProductResponse[]
  [key: string]: any
}
