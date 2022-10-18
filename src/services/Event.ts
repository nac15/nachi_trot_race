import IRequestDetails from '../interfaces/IRequestDetails'
import IUserAuthParams from '../interfaces/IUserAuthParams'
import IEventResponse from '../interfaces/IEventReponseData'
import IAuthResponseData from '../interfaces/IAuthResponseData'
import Api from './Api'
import { TrotEvent } from '../models/TrotEvent'
import Logger from '../utils/Logger'
const config = require('config')
const ErrorConstants = config.get('ErrorConstants')
const HEADERS = config.get('HEADERS')
const USER_EMAIL = config.get('dbConfig.USER_EMAIL')
const USER_PASSWORD = config.get('dbConfig.USER_PASSWORD')
const AUTH = config.get('ENDPOINTS.AUTH')
const RESULT = config.get('ENDPOINTS.RESULT')
let TOKEN_KEY = config.get('dbConfig.TOKEN_KEY')

class Event {
  // Authenticating user
  public async userAuth(): Promise<IAuthResponseData> {
    let token: string = ''
    let response: any
    try {
      const userCredentials: IUserAuthParams = {
        email: USER_EMAIL || '',
        password: USER_PASSWORD || '',
      }
      const params: IRequestDetails = {
        endpoint: AUTH,
        method: 'POST',
        params: userCredentials,
        headers: HEADERS,
        token: '',
      }
      // Calling API for authenticating user
      response = await Api.userApi(params)
      token = response?.data?.token
      TOKEN_KEY = 'Bearer ' + token
    } catch (error) {
      Logger.error(ErrorConstants.USER_AUTHENTICATION_ERROR)
      return response
    }
    return response
  }

  // Get race events
  public async getRaceEvents(): Promise<IEventResponse> {
    let events: any

    const token = TOKEN_KEY || ''
    try {
      const params: IRequestDetails = {
        endpoint: RESULT,
        method: 'GET',
        token: '',
        headers: {
          ...HEADERS,
          Authorization: token,
        },
      }
      // Calling API for getting race events
      const response = await Api.userApi(params)
      events = response
      if (events?.data != '')
        Logger.info(`'event:'  ${JSON.stringify(events.data)}`)
    } catch (error) {
      Logger.error(ErrorConstants.GET_RACE_EVENTS_ERROR)
    }
    return events
  }

  // Saving race events in the database
  public async saveRaceEvents(params: any) {
    try {
      const dataToSave = new TrotEvent({
        event: params.event,
        horse: params.horse,
        time: params.time,
      })

      await dataToSave.save()
      Logger.info('Event Saved in Database')
    } catch (error) {
      Logger.error(ErrorConstants.SAVE_RACE_EVENTS_ERROR)
    }
  }
}

export default new Event()
