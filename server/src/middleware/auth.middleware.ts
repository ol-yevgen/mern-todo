// import { Request, Response, NextFunction } from 'express'
// import config from '../utils/validateEnv.js'
// import jwt from 'jsonwebtoken'
// import 'dotenv/config'

// module.exports = (req:Request, res:Response, next:NextFunction) => {
//     if (req.method === 'OPTIONS') {
//         return next()
//     }

//     try {
//         const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"

//         if (!token) {
//             return res.status(401).json({ message: 'Not authorized'})
//         }

//         const decoded = jwt.verify(token, config.JWT_SECRET)
//         req.user = decoded
//         next()

//     } catch (error) {
//         res.status(401).json({ message: 'Not authorized' })
//     }
    
// }