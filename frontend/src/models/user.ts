import { AddressResponse } from './address'

export interface User {
  id: number
  fullName: string
  email: string
  status: 'active' | 'deactive'
  birthday: string
  gender: 'male' | 'female'
  address: AddressResponse
}
