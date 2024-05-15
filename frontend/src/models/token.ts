export interface TokenResponse {
  accessToken: string
  refreshToken: string
  cart: any
}

export interface TokenLocalStorage {
  timestamp: number
  value: string
}

export interface TokenAuthPayload {
  token: string
}
