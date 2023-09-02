import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model.js'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from 'bcryptjs';
// import logger from '../utils/logger.js';

interface RegisterUserBody extends Request {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}

export const login = async (req: RegisterUserBody, res: Response, next: NextFunction) => {

    try {
        const JWT_SECRET = process.env.JWT_SECRET as string

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
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        const refreshToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token 
        res.cookie('accessToken', accessToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            maxAge: 60 * 60 * 1000//cookie expiry: set to match rT
        })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true, //accessible only by web server 
                secure: true, //https
                maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
            })
            .status(201)
            .json(
                {
                    loggedIn: true,
                    token: accessToken,
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
        const {name} = req.body
        // const cookies = req.cookies
        // if (!cookies?.accessToken) return res.sendStatus(204) //No content
        res.clearCookie('accessToken', { httpOnly: true, secure: true })
        res.clearCookie('refreshToken', { httpOnly: true, secure: true })
        res.status(201).json({ message: `Bye, ${name.split(' ')[0]}!` })
    } catch (error) {
        next(error)
    }
}