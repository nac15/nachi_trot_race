import axios from 'axios'
import Logger from '../utils/Logger'
import IRequestDetails from '../interfaces/IRequestDetails'
const config = require('config')
const ErrorConstants = config.get('ErrorConstants')
const BASE_URL = config.get('dbConfig.BASE_URL')

class Api {
  // API call for all the requests
  public async userApi(params: IRequestDetails) {
    try {
      const baseURL: string = BASE_URL || ''
      const apiURL: string = baseURL + params.endpoint

      const apiCallParams = {
        url: apiURL,
        method: params.method,
        headers: params.headers,
        data: params.params,
      }

      const response = await axios(apiCallParams)
      return response
    } catch (error) {
      Logger.log(ErrorConstants.API_CALL_ERROR)
      return error
    }
  }
}

export default new Api()
