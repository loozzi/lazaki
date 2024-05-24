import { ProductDetailResponse, ProductResponse, ProductSearchParams } from '~/models/product'
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

const detail = async (slug: string): Promise<IResponse<ProductDetailResponse>> => {
  return client.get(`${apiConfig.product.detail}/${slug}`)
}

const similar = async (
  slug: string,
  params: PaginationParams
): Promise<IResponse<PaginationResponse<ProductResponse>>> => {
  return client.get(`${apiConfig.product.similar.replace(':slug', slug)}`, { params })
}

export default {
  suggest,
  all,
  search,
  detail,
  similar
}
