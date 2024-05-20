import { IResponse } from '~/models/response'
import client from './axios.service'
import apiConfig from '~/configs/api.config'

const add = (image: File): Promise<IResponse<any>> => {
  const formData = new FormData()
  formData.append('image', image)
  return client.post(apiConfig.image, formData)
}

export default {
  add
}
