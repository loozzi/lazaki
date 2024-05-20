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
