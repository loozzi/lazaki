import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import envConfig from '~/configs/env.config'

const client = axios.create({
  baseURL: envConfig.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default client
