import { Method } from 'axios'

// Interface type for API requests
export default interface IRequestDetails {
  endpoint: string
  method: Method
  headers: any
  token: string
  params?: any
}
