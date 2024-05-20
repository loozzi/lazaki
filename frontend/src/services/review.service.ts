import { IResponse, PaginationParams, PaginationResponse } from '~/models/response'
import { ReviewPayload, ReviewResponse } from '~/models/review'
import client from './axios.service'
import apiConfig from '~/configs/api.config'

const getAll = (
  productSlug: string,
  params: PaginationParams
): Promise<IResponse<PaginationResponse<ReviewResponse>>> => {
  return client.get(`${apiConfig.review}/${productSlug}`, { params })
}

const get = (params: { orderId: number }): Promise<IResponse<ReviewResponse[]>> => {
  return client.get(apiConfig.review + '/', { params })
}

const create = (payload: ReviewPayload): Promise<IResponse<any>> => {
  return client.post(`${apiConfig.review}/`, {
    ...payload,
    images: payload.images.length > 0 ? `["${payload.images.join('","')}"]` : '[]'
  })
}

export default {
  getAll,
  get,
  create
}
