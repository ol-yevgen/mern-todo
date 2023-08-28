import { FC, useCallback, useEffect, useState } from "react"
import { Task, Spinner } from "../components/index"
import { Box } from "@mui/material"
import { useHttp } from "../hooks/http.hook"
import { TaskType } from '../types/types';
import { TasksContext } from '../context/TasksContext'

export const TasksPage: FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const { request, loading } = useHttp()

    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request('/api/tasks', 'GET', null)
            setTasks(fetched)
        } catch (error) { }
    }, [request])

    useEffect(() => {
        fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <TasksContext.Provider value={{tasks, setTasks}}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', lg: 'flex-start' }, gap: '30px', width: '100%' }}>
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task._id}
                            data={task}
                        />
                    )
                })}
            </Box>
        </TasksContext.Provider>

    )
}