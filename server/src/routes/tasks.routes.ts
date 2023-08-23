import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controller/task.controller.js'
import { Router } from 'express'

const router = Router()
router.get('/api/tasks', getTasks)
router.get('/api/tasks/:taskId', getTask)
router.post('/api/tasks', createTask)
router.patch('/api/tasks/:taskId', updateTask)
router.delete('/api/tasks/:taskId', deleteTask)

export default router