import { FC, useCallback, useEffect, useState } from "react"
import { Task, Spinner } from "../components/index"
import { Box, Typography } from "@mui/material"
import { useHttp } from "../hooks/http.hook"
import { TaskType } from '../types/types';
import { useAuth } from "../hooks/auth.hook";

export const TasksPage: FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const { request, loading } = useHttp()
    const { authToken } = useAuth()
    
    const fetchTasks = useCallback(async () => {
        try {
            const isAuth = JSON.parse(localStorage.getItem('isAuth') as string
            ) 
            
            const fetched = await request('/api/tasks', 'include', 'GET', null, {
                Authorization: `Bearer ${isAuth.token}`
            })
            setTasks(fetched)
        } catch (error) { }
    }, [request])

    useEffect(() => {
        
        fetchTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', lg: 'flex-start' }, gap: '30px', width: '100%' }}>

            {tasks.length > 0
                ? tasks.map((task) => {
                    return (
                        <Task
                            key={task._id}
                            data={task}
                        />
                    )
                })
                : <Typography component="h1" variant="h5">
                    You don't have tasks
                </Typography>
            }
        </Box>
    )
}