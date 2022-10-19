import express, { Express } from 'express'
import Database from './src/database/Database'
import Race from './src/services/Race'
import Logger from './src/utils/Logger'
const config = require('config')
const ErrorConstants = config.get('ErrorConstants')
const SuccessConstants = config.get('SuccessConstants')
const NODE_PORT = config.get('dbConfig.NODE_PORT')
const app: Express = express()
const port = NODE_PORT || 8080

app.use(express.json())

app.listen(port, async (error: void) => {
  if (error != null) {
    Logger.error(ErrorConstants.SERVER_ERROR)
  } else {
    Logger.info(SuccessConstants.SERVER_CONNECTED + ` ${port}`)

    // Connecting to database
    await Database.connectDB()
      .then((isDbConnected) => {
        if (isDbConnected) {
          // Initiating race
          Race.initiateRace()
        }
      })
      .catch(() => {
        Logger.error(ErrorConstants.DATABASE_CONNECTIION_ERROR)
      })
  }
})
