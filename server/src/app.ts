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
// const BASE_FRONTEND_URL1 = process.env.BASE_FRONTEND_URL1 as string
// const BASE_FRONTEND_URL2 = process.env.BASE_FRONTEND_URL2 as string

const app = express()

// logger.info(BASE_FRONTEND_URL1)

app.use(cors())

// app.use(cors({
//     origin: [BASE_FRONTEND_URL1, BASE_FRONTEND_URL2],
//     credentials: true
// }))
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.setHeader('Access-Control-Allow-Origin', BASE_FRONTEND_URL1);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
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
