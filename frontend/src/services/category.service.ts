import apiConfig from '~/configs/api.config'
import client from './axios.service'
import { IResponse } from '~/models/response'
import { Category } from '~/models/category'

const getAll = async (): Promise<IResponse<Category[]>> => {
  return await client.get(apiConfig.category.all)
}

export default {
  getAll
}
