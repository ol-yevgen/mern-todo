import { login, logout } from '../controller/auth.controller.js'
import { Router } from 'express'

const router = Router()
router.post('/api/auth/login', login)
router.post('/api/auth/logout', logout)

export default router