import { registration } from '../controller/user.controller.js';
import { Router } from 'express'

const router = Router()
router.post('/api/user/registration', registration)

export default router