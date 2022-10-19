import { StatusCodes } from 'http-status-codes'
import Event from './Event'
import Logger from '../utils/Logger'
const config = require('config')
const ErrorConstants = config.get('ErrorConstants')
const SuccessConstants = config.get('SuccessConstants')

class Race {
  // Starting race server
  public async initiateRace() {
    // Authenticating user
    await Event.userAuth()
      .then((response: any) => {
        if (response?.response?.status === StatusCodes.UNAUTHORIZED) {
          // User Unauthorized
          Logger.error(ErrorConstants.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
        } else if (
          response?.response?.status === StatusCodes.SERVICE_UNAVAILABLE
        ) {
          // Service unavailable
          this.initiateRace()
          Logger.error(
            ErrorConstants.NO_CONTENT,
            StatusCodes.SERVICE_UNAVAILABLE
          )
        } else if (response?.status === StatusCodes.OK) {
          // Getting race events
          Logger.info(
            SuccessConstants.SUCCESSFUL_AUTHENTICATION,
            StatusCodes.OK
          )
          this.startTrotRace()
        }
      })
      .catch(() => {
        // Go back to authenticating user
        Logger.error(ErrorConstants.TOKEN_ERROR)
      })
  }

  // Getting race events and processing
  private async startTrotRace() {
    // Getting race events
    await Event.getRaceEvents()
      .then(async (events: any) => {
        if (events?.status === StatusCodes.OK) {
          // save race event into db and check for the next one
          if (events?.data != '') await Event.saveRaceEvents(events.data)
          this.startTrotRace()
          Logger.info(SuccessConstants.SUCCESSFUL_REQUEST, StatusCodes.OK)
        } else if (events?.response?.status === StatusCodes.UNAUTHORIZED) {
          // User authorized
          this.initiateRace()
          Logger.error(ErrorConstants.TOKEN_MISSING, StatusCodes.UNAUTHORIZED)
        } else if (events?.status === StatusCodes.NO_CONTENT) {
          // In case of no data and status 204 , recheck for events
          Logger.error(
            ErrorConstants.TIME_OUT + 'error code : ' + StatusCodes.NO_CONTENT
          )
          Logger.info('creating new request for the events')
          this.startTrotRace()
        }
      })
      .catch(() => {
        // Go back to authenticating user
        Logger.error(ErrorConstants.GET_RACE_EVENTS_ERROR)
        this.initiateRace()
      })
  }
}

export default new Race()
