import { Category } from './category'
import { PaginationParams } from './response'

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
  id?: number
  name: string
  slug: string
  price: number
  sold: number
  image: string
  rating: number

  [key: string]: any
}

export interface ProductAdminResponse extends ProductResponse {
  quantity: number
  categories: string[]
}

export interface PropertyPayload {
  name: string
  value: string
}

export interface VariationPayload {
  id?: number
  type: string
  name: string
  option: string
  image: string
  price: number
  oldPrice: number
  quantity: number
  sold: number
}

export interface ImagePayload {
  link: string
  isPrimary: boolean
}

export interface CategoryPayload {}

export interface ProductUpdatePayload {
  productId: number
  productName: string
  slug: string
  description: string
  properties: PropertyPayload[]
  addVariations: VariationPayload[]
  removeVariations: number[]
  editVariations: VariationPayload[]
  images: ImagePayload[]
  categories: number[]
}

export interface ProductCreatePayload {
  productName: string
  slug: string
  description: string
  properties: PropertyPayload[]
  variations: VariationPayload[]
  images: ImagePayload[]
  categories: number[]
}

export interface ProductAdminSearchParams extends PaginationParams {
  keyword?: string
  order?: 'asc' | 'desc'
  type?: 'sold' | 'quantity'
}
