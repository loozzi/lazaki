import { OrderHistoryResponse } from './order'

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  cart: OrderHistoryResponse
}

export interface TokenLocalStorage {
  timestamp: number
  value: string
}

export interface TokenAuthPayload {
  token: string
}
