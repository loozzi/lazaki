import apiConfig from '~/configs/api.config'
import { AdminOrderUpdatePayload, AdminOverviewParams, AdminOverviewResponse } from '~/models/admin'
import { Category, CategoryCreatePayload, CategoryUpdatePayload } from '~/models/category'
import { OrderHistoryResponse } from '~/models/order'
import {
  ProductAdminResponse,
  ProductAdminSearchParams,
  ProductCreatePayload,
  ProductDetailResponse,
  ProductUpdatePayload
} from '~/models/product'
import { IResponse, PaginationParams, PaginationResponse } from '~/models/response'
import { UserAdminResponse } from '~/models/user'
import client from './axios.service'

const product = {
  get: async (query: ProductAdminSearchParams): Promise<IResponse<PaginationResponse<ProductAdminResponse>>> => {
    return client.get(apiConfig.admin.product, { params: query })
  },
  create: async (data: ProductCreatePayload): Promise<IResponse<ProductDetailResponse>> => {
    return client.post(apiConfig.admin.product, {
      ...data,
      properties: JSON.stringify(data.properties),
      variations: JSON.stringify(data.variations),
      images: JSON.stringify(data.images),
      categories: JSON.stringify(data.categories)
    })
  },
  update: async (data: ProductUpdatePayload): Promise<IResponse<ProductDetailResponse>> => {
    return client.put(apiConfig.admin.product, {
      ...data,
      properties: JSON.stringify(data.properties),
      addVariations: JSON.stringify(data.addVariations),
      removeVariations: JSON.stringify(data.removeVariations),
      editVariations: JSON.stringify(data.editVariations),
      images: JSON.stringify(data.images),
      categories: JSON.stringify(data.categories)
    })
  },
  delete: async (slug: string): Promise<IResponse<any>> => {
    return client.delete(`${apiConfig.admin.product}/${slug}`)
  }
}

const user = {
  get: async (params: PaginationParams): Promise<IResponse<PaginationResponse<UserAdminResponse>>> => {
    return client.get(apiConfig.admin.user, { params })
  },
  update: async (id: number): Promise<IResponse<any>> => {
    return client.put(apiConfig.admin.user, { id })
  }
}

const overview = async (params: AdminOverviewParams): Promise<IResponse<AdminOverviewResponse>> => {
  return client.get(apiConfig.admin.overview, { params })
}

const category = {
  create: async (payload: CategoryCreatePayload): Promise<IResponse<Category>> => {
    return client.post(apiConfig.admin.category, payload)
  },
  update: async (payload: CategoryUpdatePayload): Promise<IResponse<Category>> => {
    return client.put(apiConfig.admin.category, payload)
  },
  delete: async (slug: string): Promise<IResponse<any>> => {
    return client.delete(`${apiConfig.admin.category}/${slug}`)
  }
}

const order = {
  get: async (params: PaginationParams): Promise<IResponse<PaginationResponse<OrderHistoryResponse>>> => {
    return client.get(apiConfig.admin.order, { params })
  },
  update: async (
    type: 'status' | 'shipping' | 'paymentStatus',
    payload: AdminOrderUpdatePayload
  ): Promise<IResponse<any>> => {
    return client.put(apiConfig.admin.order, payload, { params: { type } })
  },
  detail: async (orderId: number): Promise<IResponse<OrderHistoryResponse>> => {
    return client.get(`${apiConfig.admin.order}/${orderId}`)
  }
}

export default {
  product,
  user,
  overview,
  category,
  order
}
