import { AddressResponse } from './address'
import { Base } from './base'

export type PaymentMethodType = 'cod' | 'banking'
export type PaymentStatusType = 'paid' | 'unpaid'
export type OrderStatusType = 'success' | 'order' | 'cancel' | 'shipping' | 'preparing'

export interface CartItem {
  id?: number
  orderId?: number
  productId?: number
  variationId?: number
  name: string
  image: string
  variation: {
    type: string
    name: string
    option: string
  }
  quantity: number
  price: number
  oldPrice: number

  [key: string]: any
}

export interface OrderHistoryResponse extends Base {
  id: number
  customerId: number
  fullName?: string
  email?: string
  address?: AddressResponse
  paymentMethod?: PaymentMethodType
  paymentStatus?: PaymentStatusType
  note?: string
  status: OrderStatusType
  shippingName?: string
  shippingCode?: string
  orderDetails: CartItem[]
  totalAmount?: number
  [key: string]: any
}

export interface OrderConfirmPayload {
  orderId: number
  fullName: string
  email: string
  phoneNumber: string
  province: string
  district: string
  ward: string
  street: string
  note: string
  paymentMethod: PaymentMethodType

  [key: string]: any
}
