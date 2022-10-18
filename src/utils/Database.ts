import mongoose from 'mongoose'
import Logger from './Logger'
const config = require('config')
const dbConfig = config.get('dbConfig')
const ErrorConstants = config.get('ErrorConstants')
const SuccessConstants = config.get('SuccessConstants')

class Database {
  public dbURL: string
  constructor() {
    this.dbURL = dbConfig.MONGO_DB_URL || ''
  }
  // Create database connection
  async connectDB() {
    Logger.info('the db url is  : ' + this.dbURL)
    return await mongoose
      .connect(this.dbURL)
      .then(() => {
        Logger.info(SuccessConstants.DATABASE_CONNECTED)
        return true
      })
      .catch(() => {
        Logger.error(ErrorConstants.DATABASE_CONNECTIION_ERROR)
        return false
      })
  }

  // Close database connection
  async closeConnection() {
    mongoose.connection.close()
  }
}
export default new Database()
