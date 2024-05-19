import apiConfig from '~/configs/api.config'
import client from './axios.service'
import { IResponse } from '~/models/response'

interface PaymentQrCodeResponse {
  qrCode: string
}

interface PaymentConfirmResponse {
  status: string
}

const getQrCode = async (orderId: number): Promise<IResponse<PaymentQrCodeResponse>> => {
  return client.get(`${apiConfig.payment.root}/${orderId}`)
}

const confirm = async (payload: { orderId: number }): Promise<IResponse<PaymentConfirmResponse>> => {
  return client.post(apiConfig.payment.confirm, payload)
}

export default {
  getQrCode,
  confirm
}
