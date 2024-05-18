import { ProductResponse, ProductSearchParams } from '~/models/product'
import { IResponse, PaginationParams, PaginationResponse } from '~/models/response'
import client from './axios.service'
import apiConfig from '~/configs/api.config'

const suggest = async (query: PaginationParams): Promise<IResponse<PaginationResponse<ProductResponse>>> => {
  return client.get(apiConfig.product.suggest, { params: query })
}

const all = async (query: PaginationParams): Promise<IResponse<PaginationResponse<ProductResponse>>> => {
  return client.get(apiConfig.product.all, { params: query })
}

const search = async (query: ProductSearchParams): Promise<IResponse<PaginationResponse<ProductResponse>>> => {
  return client.get(apiConfig.product.search, { params: query })
}

const detail = async (slug: string) => {
  return client.get(`${apiConfig.product.detail}/${slug}`)
}

export default {
  suggest,
  all,
  search,
  detail
}
