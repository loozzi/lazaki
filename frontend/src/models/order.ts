export interface CartItem {
  id?: number
  orderId?: number
  variationId: number
  productId: number
  quantity: number
  price: number
  oldePrice: number
}

export interface Cart {
  cartItems: CartItem[]
  [key: string]: any
}
