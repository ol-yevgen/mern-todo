import express, { Request, Response, NextFunction } from 'express';
import errorHandler from './middleware/error.middleware.js';
import connectToBd from './utils/connectToDb.js';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';
import logger from './utils/logger.js';
import morgan from 'morgan';
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.PORT || 5050

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, 'Page not found'))
})
app.use(errorHandler) 

connectToBd()

app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`)
})

// import config from './utils/validateEnv.js'
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
