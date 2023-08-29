import { NextFunction, Request, Response, RequestHandler } from 'express'
import Task from '../models/task.model.js'
import createHttpError from 'http-errors'
import mongoose from 'mongoose' 
// import logger from '../utils/logger.js'

export const getTasks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find().exec()
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

export const getTask: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId

    try {
        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, 'Invalid task id')
        }

        const task = await Task.findById(taskId).exec()

        if (!task) {
            throw createHttpError(404, 'Task not found')
        }

        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
} 

interface CreateNoteBody {
    title?: string,
    text?: string,
    done?: boolean
}

export const createTask: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {

    try {
        const { title, text } = req.body

        const titleExisted = await Task.findOne({ title })
        const textExisted = await Task.findOne({ text })

        if (!title) {
            throw createHttpError(400, 'Task must have a title')
        }
        if (!text) {
            throw createHttpError(400, 'Task must have a text')
        }

        if (titleExisted) {
            throw createHttpError(400, 'Task with same title already exist')
        }

        if (textExisted) {
            throw createHttpError(400, 'Task with same text already exist')
        }

        const newTask = new Task({
            title,
            text
            // owner: req.user.userId
        })

        await newTask.save()

        res.status(201).json({ message: `Task ${title} has been created`})
    } catch (error) {
        next(error)
    }
}

interface UpdateTaskParams {
    taskId: string
}

interface UpdateTaskBody {
    title?: string,
    text?: string
    done: boolean 
}

export const updateTask: RequestHandler<UpdateTaskParams, unknown, UpdateTaskBody, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId
    const { title, text, done } = req.body
    const titleExisted = await Task.findOne({ title })
    const textExisted = await Task.findOne({ text })
    // const doneExisted = await Task.findByIdAndUpdate(taskId, {done: done})
    
    try {
        const task = await Task.findById(taskId).exec()

        if (!task) {
            throw createHttpError(404, 'Task not found')
        }

        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, 'Invalid task id')
        }

        if (task.done === done) {
            
            if (!title) {
                throw createHttpError(400, 'Task must have a title')
            }

            if (!text) {
                throw createHttpError(400, 'Task must have a text')
            }

            if (titleExisted && task.id !== taskId) {
                throw createHttpError(400, 'Task with same title already exist')
            }

            if (textExisted && task.id !== taskId) {
                throw createHttpError(400, 'Task with same text already exist')
            }

            task.title = title
            task.text = text

            const updatedTask = await task.save()

            res.status(201).json(updatedTask)
        } else {
            const message = done ? 'Task has been done' : 'Task under the maintenance'
            task.done = done

            await task.save()

            res.status(201).json(message)
        }
        
    } catch (error) {
        next(error)
    }
}
// interface DoneTaskBody {
//     done: boolean 
// }

// export const doneTask: RequestHandler<UpdateTaskParams, unknown, DoneTaskBody, unknown> = async (req, res, next) => {
//     const taskId = req.params.taskId
//     const { done } = req.body

//     try {
//         const task = await Task.findById(taskId).exec()
        

//         if (!task) {
//             throw createHttpError(404, 'Task not found')
//         }

//         if (!mongoose.isValidObjectId(taskId)) {
//             throw createHttpError(400, 'Invalid task id')
//         }

//         task.done = done

//         await task.save()

//         res.status(201).json(message)
//     } catch (error) {
//         next(error)
//     }
// }

export const deleteTask: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId

    try {

        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, 'Invalid task id')
        }

        const task = await Task.findById(taskId).exec()


        if (!task) {
            throw createHttpError(404, 'Task not found')
        }

        await task.deleteOne()

        res.status(204).json('Task has been deleted')
    } catch (error) {
        next(error)
    }
}
