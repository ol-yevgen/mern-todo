import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controller/task.controller.js'
import { Router } from 'express'
import jwtVerify from '../middleware/jwtVerify.middleware.js'

const router = Router()

router.use(jwtVerify)

router.get('/api/tasks', getTasks)
router.get('/api/tasks/:taskId', getTask)
router.post('/api/tasks', createTask)
router.patch('/api/tasks/:taskId', updateTask)
router.delete('/api/tasks/:taskId', deleteTask)

export default router