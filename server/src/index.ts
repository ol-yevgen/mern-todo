import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import compression from 'compression'
import * as mongoose from 'mongoose'
import cors from 'cors'
import config from './config.js'
import 'dotenv/config'

const app = express()

const PORT = config.PORT || 5050

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

async function start() {
    try {
        await mongoose.connect(config.MONGO_URI), {
            useNewURLParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Server error:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
        process.exit(1)
    }
}

start()

app.listen(PORT, () => console.log(`Listening server on port ${PORT}`))