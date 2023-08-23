import { pino, Logger } from 'pino'
import 'dotenv/config'

const level = <string>process.env.LOG_LEVEL || 'info'
let logger: Logger

if (process.env.NODE_ENV === 'dev') {
    logger = pino({
        transport: {
            target: 'pino-pretty',
        },
        level,
        base: {
            pid: false,
        },
    })
} else {
    logger = pino({
        level,
        base: {
            pid: false,
        },
    })
}



export default logger

