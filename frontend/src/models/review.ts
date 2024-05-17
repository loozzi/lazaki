export interface ReviewResponse {
  id: number
  fullName: string
  variationId: number
  productId: number
  variation?: {
    type: string
    name: string
    option: string
  }
  value: number
  content?: string
  images?: string[]
  created_at: string
}

export interface ReviewPayload {
  value: number
  content: string
  variationId: number
  productId: number
  orderId: number
  images?: string[]
}
