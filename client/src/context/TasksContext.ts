import { Dispatch, SetStateAction, createContext } from "react";
import { TaskType } from '../types/types'

export interface TasksContextTypes {
    tasks: TaskType[],
    setTasks: Dispatch<SetStateAction<TaskType[]>>
}

export const TasksContext = createContext<TasksContextTypes>({
    tasks: [],
    setTasks: () => {}
})