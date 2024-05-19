import apiConfig from '~/configs/api.config'
import { IResponse } from '~/models/response'
import { TokenAuthPayload, TokenResponse } from '~/models/token'
import client from '~/services/axios.service'

const signIn = async (data: TokenAuthPayload): Promise<IResponse<TokenResponse>> => {
  return await client.post(apiConfig.auth.signIn, {
    token: data.token
  })
}

const adminSignIn = async (data: {
  username: string
  password: string
}): Promise<IResponse<{ accessToken: string }>> => {
  return await client.post(apiConfig.auth.loginAdmin, data)
}

const refreshToken = async (payload: { token: string }): Promise<IResponse<TokenResponse>> => {
  return await client.post(apiConfig.auth.refreshToken, payload)
}

export default {
  signIn,
  adminSignIn,
  refreshToken
}
