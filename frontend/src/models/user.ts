import { AddressResponse } from './address'

type Gender = 'male' | 'female'
type CustomerStatus = 'active' | 'deactive'

export interface User {
  id?: number
  fullName: string
  email: string
  status?: CustomerStatus
  birthday: string
  gender: Gender
  address: AddressResponse
}

export interface UserUpdatePayload {
  fullName?: string
  birthday?: string
  gender?: Gender
  email?: string
  phoneNumber?: string
  province?: string
  district?: string
  ward?: string
  street?: string
}
