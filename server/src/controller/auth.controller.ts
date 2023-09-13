import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model.js'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from 'bcryptjs';
import logger from '../utils/logger.js';
// import logger from '../utils/logger.js';

interface RegisterUserBody extends Request {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

export const login = async (req: RegisterUserBody, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw createHttpError(400, 'All fields are required')
        }

        const user = await User.findOne({ email }).exec()

        if (!user) {
            return res.status(400).json({ message: 'User with such email not found' })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(401).json({ message: 'Wrong password' })

        const accessToken = jwt.sign(
            { userId: user._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        )

        const refreshToken = jwt.sign(
            { userId: user._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token 
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
            .status(201)
            .json(
                {
                    accessToken,
                    userId: user._id,
                    userName: user.firstName + ' ' + user.lastName,
                    message: `Welcome, ${user.firstName}`
                })
            

    } catch (error) {
        next(error)
    }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName } = req.body
        const cookies = req.cookies

        if (!cookies?.refreshToken) return res.sendStatus(204) //No content

        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true })
        return res.status(201).json({ loggedIn: false, message: `Bye, ${userName.split(' ')[0]}!` })

    } catch (error) {
        next(error)
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies

        if (!cookies?.refreshToken) return res.status(401)

        const refreshToken = cookies.refreshToken

        const { userId } = <jwt.UserIDJwtPayload>jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        
        if (!userId) return res.status(403).json({ message: 'Forbidden' })

        const foundUser = await User.findById(userId).exec()

        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

        const accessToken = jwt.sign(
            { userId: userId },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        )

        res.json({ accessToken })


    } catch (error) {
        logger.info(error)
        next(error)
    }

}