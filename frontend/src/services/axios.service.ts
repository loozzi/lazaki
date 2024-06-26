import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import apiConfig from '~/configs/api.config'
import envConfig from '~/configs/env.config'
import tokenService from './token.service'
import authService from './auth.service'
import { history } from '~/configs/history'
import routes from '~/configs/routes'

const client = axios.create({
  baseURL: envConfig.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const whiteList = [apiConfig.auth.signIn, apiConfig.auth.loginAdmin, apiConfig.auth.refreshToken]
    const blackList = [apiConfig.order.add, apiConfig.order.current, apiConfig.user, apiConfig.payment.root]

    const pass: boolean = whiteList.some((url) => config.url?.includes(url))

    if (pass) {
      return config
    }

    if (config.url?.includes(apiConfig.admin.root)) {
      const adminAccessToken = localStorage.getItem('adminAccessToken')
      if (adminAccessToken) {
        config.headers.Authorization = `Bearer ${adminAccessToken}`
        return config
      } else {
        return config
      }
    } else {
      const accessToken = tokenService.getAccessToken()
      const refreshToken = tokenService.getRefreshToken()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      } else if (refreshToken) {
        authService.refreshToken({ token: refreshToken }).then((res) => {
          if (res.status === 200) {
            tokenService.signIn(res.data!.accessToken, res.data!.refreshToken)
          }
        })
      }

      const _accessToken = tokenService.getAccessToken()
      if (_accessToken) config.headers.Authorization = `Bearer ${_accessToken}`
      else if (blackList.some((url) => config.url?.includes(url))) history.push(routes.client.auth)
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // if (response.data.message === 'Unauthorized') history.push(routes.client.auth)
    if (response.data.message === 'Forbidden') {
      localStorage.removeItem('adminAccessToken')
      history.push(routes.admin.login)
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default client
