import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
// import { NextFunction, Request, Response, RequestHandler } from 'express'
import User from '../models/user.model.js'
// import logger from '../utils/logger.js'

interface RegisterUserBody {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}

export const registration: RequestHandler<unknown, unknown, RegisterUserBody, unknown> = async (req, res, next) => {

    try {
        const { firstName, lastName, email, password } = req.body

        const emailExisted = await User.findOne({ email })

        if (!firstName || !lastName || !password) {
            return res.status(409).json({ message: 'Some parameters missing' })
        }

        if (emailExisted) {
            return res.status(409).json({ message: 'User with same email already exist' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({ message: `User with name ${firstName} has been registered` })
    } catch (error) {
        next(error)
    }
}
