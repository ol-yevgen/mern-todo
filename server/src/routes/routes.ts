import { Router } from 'express'
import tasks from './tasks.routes.js'
import user from './user.routes.js'
const router = Router()

router.use(tasks)
router.use(user)

export default router