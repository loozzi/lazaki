import apiConfig from '~/configs/api.config'
import { IResponse } from '~/models/response'
import { TokenLocalStorage, TokenResponse } from '~/models/token'
import client from './axios.service'

const signIn = (accessToken: string, refreshToken: string): void => {
  const data: TokenLocalStorage = {
    timestamp: Date.now(),
    value: accessToken
  }

  localStorage.setItem('accessToken', JSON.stringify(data))
  localStorage.setItem('refreshToken', refreshToken)
}

const signOut = (): void => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('cart')
}

const getAccessToken = (): string | null => {
  const data: string | null = localStorage.getItem('accessToken')
  if (!data) return null
  const token: TokenLocalStorage = JSON.parse(data)
  if (Date.now() - token.timestamp > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('accessToken')
    return null
  }
  return token.value
}

const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken')
}

const setCart = (cart: any): void => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const generateToken = (refreshToken: string): Promise<IResponse<TokenResponse>> => {
  return client.post(apiConfig.auth.refreshToken, {
    token: refreshToken
  })
}

export default {
  signIn,
  signOut,
  getAccessToken,
  getRefreshToken,
  setCart,
  generateToken
}
