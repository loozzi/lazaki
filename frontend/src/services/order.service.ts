import apiConfig from '~/configs/api.config'
import client from './axios.service'
import { IResponse, PaginationResponse } from '~/models/response'
import {
  CartItem,
  OrderConfirmPayload,
  OrderCreatePayload,
  OrderHistoryResponse,
  OrderUpdatePayload
} from '~/models/order'

const current = (): Promise<IResponse<OrderHistoryResponse>> => {
  return client.get(apiConfig.order.current)
}

const histories = (): Promise<IResponse<PaginationResponse<OrderHistoryResponse>>> => {
  return client.get(apiConfig.order.history)
}

const detail = (id: number): Promise<IResponse<OrderHistoryResponse>> => {
  return client.get(`${apiConfig.order.detail}/${id}`)
}

const update = (payload: OrderUpdatePayload): Promise<IResponse<OrderHistoryResponse>> => {
  return client.post(apiConfig.order.update, payload)
}

const purchase = (payload: OrderConfirmPayload): Promise<IResponse<OrderHistoryResponse>> => {
  return client.post(apiConfig.order.purchase, payload)
}

const add = (payload: OrderCreatePayload): Promise<IResponse<CartItem>> => {
  return client.post(apiConfig.order.add, payload)
}

const remove = (id: number): Promise<IResponse<any>> => {
  return client.delete(`${apiConfig.order.remove}/${id}`)
}

export default {
  current,
  histories,
  detail,
  update,
  purchase,
  add,
  remove
}
