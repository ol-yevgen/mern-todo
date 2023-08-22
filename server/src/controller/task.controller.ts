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
    const {title, text} = req.body
    const titleExisted = await Task.findOne({title})
    const textExisted = await Task.findOne({text})

    try {
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

        const newTask = await Task.create({
            title: title,
            text: text
        })


        res.status(201).json(newTask)
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
}

export const updateTask: RequestHandler<UpdateTaskParams, unknown, UpdateTaskBody, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId
    const { title, text } = req.body
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

        task.title = title
        task.text = text

        const updatedTask = await task.save()

        res.status(201).json(updatedTask)
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

        res.status(204).json('Task has been deleted')
    } catch (error) {
        next(error)
    }
}
