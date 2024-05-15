import apiConfig from '~/configs/api.config'
import { IResponse } from '~/models/response'
import { TokenAuthPayload } from '~/models/token'
import client from '~/services/axios.service'

const signIn = async (data: TokenAuthPayload): Promise<IResponse<any>> => {
  return await client.post(apiConfig.auth.signIn, {
    token: data.token
  })
}

export default {
  signIn
}
