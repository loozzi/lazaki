import { Category } from './category'

export interface PropertyResponse {
  name: string
  value: string
  [key: string]: any
}

export interface VariationResponse {
  id: number
  type: string
  name: string
  option: string
  image: string
  price: number
  oldPrice: number
  quantity: number
  sold: number
  [key: string]: any
}

export interface ImageResponse {
  link: string
  variationId: number
  isPrimary: boolean
  [key: string]: any
}

export interface ProductDetailResponse {
  id: number
  name: string
  description: string
  properties: PropertyResponse[]
  variations: VariationResponse[]
  images: ImageResponse[]
  categories: Category[]
  [key: string]: any
}

export interface ProductResponse {
  name: string
  slug: string
  price: number
  sold: number
  image: string
  rating: number
}
