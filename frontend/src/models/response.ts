export interface IResponse<T> {
  data?: T
  message: string
  status: number
  error?: any
}

export interface PaginationResponse<T> {
  currentPage: number
  perPage: number
  total: number
  data: T[]
}

export interface PaginationParams {
  page?: number
  limit?: number

  [key: string]: any
}

export interface PaginationState {
  currentPage: number
  perPage: number
  total: number
}
