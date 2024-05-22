import { OrderStatusType, PaymentStatusType } from './order'

export interface AdminOverviewParams {
  time: 'week' | 'month'
  type: 'category' | 'product' | 'all'
  slug?: string
}

export interface AdminOverviewResponse {
  totalRevenue: number
  totalOrder: number
  pendingOrder: number
  completedOrder: number
  totalProduct: number
  totalCategory: number
  totalCustomer: number
}

export interface AdminOrderUpdatePayload {
  orderId: number

  status?: OrderStatusType

  shippingMethod?: string
  shippingCode?: string

  paymentStatus?: PaymentStatusType
}
