import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Task, Spinner } from "../components/index"
import { Box, Typography } from "@mui/material"
import { useHttp } from "../hooks/http.hook"
import { TaskType } from '../types/types';
import { AuthContext } from "../context/AuthContext";

export const TasksPage: FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const { request, loading } = useHttp()

    const { auth } = useContext(AuthContext)

    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request('/api/tasks', 'GET', null, {
                Authorization: `Bearer ${auth?.accessToken}`
            })
            setTasks(fetched)
        } catch (error) { }
    }, [request, auth?.accessToken])

    useEffect(() => {

        fetchTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <>{tasks.length > 0
            ? <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', lg: 'flex-start' }, gap: '30px', width: '100%' }}>
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task._id}
                            data={task}
                        />
                    )
                })
                }
            </Box>
            : <Typography component="h1" variant="h5">
                You don't have tasks
            </Typography>
        }
        </>

    )
}