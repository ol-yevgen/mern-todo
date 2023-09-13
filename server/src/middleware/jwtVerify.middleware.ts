import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
// import logger from '../utils/logger.js';

// declare module 'jsonwebtoken' {
//     export interface UserIDJwtPayload extends jwt.JwtPayload {
//         userId: string
//     }
// }

interface MyRequest extends Request {
    userId?: string
}

export const jwtVerify = (req: MyRequest, res: Response, next: NextFunction) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

    const authHeader = req.headers.authorization || req.headers.Authorization as string
    // const cookiesToken: string = req.cookies.accessToken

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'You are not authenticated' })
    }
    // if (!cookiesToken) {
    //     return res.status(401).json({ message: 'You are not authenticated' })
    // }

    const token = authHeader.split(' ')[1];

    const { userId } = <jwt.UserIDJwtPayload>jwt.verify(token, ACCESS_TOKEN_SECRET);
    
    req.userId = userId
    next()
};

export default jwtVerify;