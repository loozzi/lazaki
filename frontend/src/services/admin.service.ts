import { IResponse, PaginationResponse } from '~/models/response'
import client from './axios.service'
import {
  ProductAdminResponse,
  ProductAdminSearchParams,
  ProductCreatePayload,
  ProductDetailResponse,
  ProductUpdatePayload
} from '~/models/product'
import apiConfig from '~/configs/api.config'

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

export default {
  product
}
