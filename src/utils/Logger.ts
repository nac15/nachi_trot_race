import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const config = require('config')

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

const transport: DailyRotateFile = new DailyRotateFile({
  filename: config.get('logConfig.logFolder') + config.get('logConfig.logFile'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '15d',
  level: config.get('logConfig.logFileLevel'),
})

const Logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: 'info',
      silent: config.get('NODE_ENV') === 'production',
    }),
  ],
})

export default Logger
