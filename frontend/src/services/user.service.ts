import apiConfig from '~/configs/api.config'
import client from './axios.service'
import { UserUpdatePayload } from '~/models/user'
import { IResponse } from '~/models/response'
import { User } from 'firebase/auth'

const get = () => {
  return client.get(apiConfig.user)
}

const update = (payload: UserUpdatePayload): Promise<IResponse<User>> => {
  return client.put(apiConfig.user, payload)
}

export default {
  get,
  update
}
