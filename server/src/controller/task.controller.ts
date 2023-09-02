import { NextFunction, Request, Response, RequestHandler } from 'express'
import Task from '../models/task.model.js'
import createHttpError from 'http-errors'
import mongoose from 'mongoose' 
// import logger from '../utils/logger.js'
interface UserIdRequest extends Request {
    userId?: string
}

export const getTasks: RequestHandler = async (req: UserIdRequest, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find({owner: req.userId}).exec()
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

interface CreateTaskBody extends Response{
    title?: string,
    text?: string,
}

export const createTask = async (req: UserIdRequest, res: CreateTaskBody, next:NextFunction) => {

    try {
        const { title, text } = req.body

        const titleExisted = await Task.findOne({ title }).findOne({ owner: req.userId })
        const textExisted = await Task.findOne({ text }).findOne({ owner: req.userId })

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
            text,
            owner: req.userId
        })

        await newTask.save()

        res.status(201).json({ message: `Task has been created`})
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

            if (titleExisted && (titleExisted.id !== taskId) ) {
                throw createHttpError(400, 'Task with same title already exist')
            }

            if (textExisted && (textExisted.id !== taskId)) {
                throw createHttpError(400, 'Task with same text already exist')
            }

            task.title = title
            task.text = text

            await task.save()

            res.status(201).json({message: 'Task has been updated'})
        } else {
            const message = done ? 'Task has been done' : null
            task.done = done

            await task.save()

            res.status(201).json({message: message})
        }
        
    } catch (error) {
        next(error)
    }
}

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

        return res.status(201).json({ message: 'Task has been deleted' })
    } catch (error) {
        next(error)
    }
}
