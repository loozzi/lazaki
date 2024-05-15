export interface IResponse<T> {
  data?: T
  message: string
  status: number
  error?: any
}
