import {pino, Logger} from 'pino'
import 'dotenv/config'

const level = process.env.LogLevel

const logger: Logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    level,
    base: {
        pid: false,
    },
})

export default logger

