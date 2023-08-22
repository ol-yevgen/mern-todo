// import { Router } from 'express'
// import bcrypt from 'bcryptjs'
// import User from '../models/User.model.js'
// const { check, validationResult } = require('express-validator')
// import jwt from 'jsonwebtoken';
// const router = Router()
// import 'dotenv/config'

// //api/auth/register
// router.post(
//     '/register',
//     [
//         check('email', 'Uncorrected email').isEmail(),
//         check('password', 'Minimum 2 characters').isLength({ min: 6 })
//     ],
//     async (req, res) => {

//         try {
//             const errors = validationResult(req)

//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: 'Uncorrected data'
//                 })
//             }

//             const { email, password } = req.body

//             const candidate = await User.findOne({ email })

//             if (candidate) {
//                 return res.status(400).json({ message: 'Same user had been created' })
//             }

//             const hashedPassword = await bcrypt.hash(password, 12)
//             const user = new User({ email, password: hashedPassword })

//             await user.save()

//             res.status(201).json({ message: 'User created' })

//         } catch (error) {
//             res.status(500).json({ message: 'Something went wrong' })
//         }

//     })

// //api/auth/login
// router.post(
//     '/login',
//     [
//         check('email', 'Input corrected email').normalizeEmail().isEmail(),
//         check('password', 'Input password').exists()
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req)

//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: 'Uncorrected data in registration'
//                 })
//             }

//             const { email, password } = req.body

//             const user = await User.findOne({ email })

//             if (!user) {
//                 return res.status(400).json({ message: 'User not found' })
//             }

//             const isMatch = await bcrypt.compare(password, user.password)

//             if (!isMatch) {
//                 return res.status(400).json({ message: 'Wrong password' })
//             }

//             const token = jwt.sign(
//                 { userId: user.id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1h' }
//             )

//             res.json({ token, userId: user.id })

//         } catch (error) {
//             res.status(500).json({ message: 'Something went wrong!!! ' })
//         }
//     })

// module.exports = router