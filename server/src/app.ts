import express, { Request, Response, NextFunction } from 'express';
import connectToBd from './utils/connectToDb.js';
import router from './routes/routes.js';
import logger from './utils/logger.js';
import morgan from 'morgan';
import 'dotenv/config'
import createHttpError, { isHttpError} from 'http-errors';

const PORT = process.env.PORT || 5050

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(router)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, 'Page not found'))
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = 'Unknown error occurred'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
    }
    if (error instanceof Error) {
        errorMessage = error.message
        logger.error(error)
    }
    res.status(statusCode).json({ error: errorMessage })
}) 
connectToBd()

app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`)

})

// import config from './utils/validateEnv.js'
// import cookieParser from 'cookie-parser';
// import compression from 'compression'
// import bodyParser from 'body-parser'
// import cors from 'cors'

// const PORT = config.PORT || 5050
// app.use(cors({
//     credentials: true
// }))
// app.use(compression())
// app.use(cookieParser())
// app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }))
