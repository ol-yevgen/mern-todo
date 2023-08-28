import { Card, Typography, Box } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { CheckBox, TaskTitle, TaskInfo, Spinner } from '../components/index'
import { TaskType as TaskModel } from '../types/types';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';

export const TaskDetailPage: FC = () => {
    const [task, setTask] = useState<TaskModel>();
    const { request, loading } = useHttp()
    const taskId = useParams().id

    // const [checked, setChecked] = useState<boolean>(done);

    const getTask = useCallback(async () => {
        try {
            const fetched = await request(`/api/tasks/${taskId}`, 'GET', null )
            setTask(fetched)
        } catch (error) { }

    }, [taskId, request])

    useEffect(() => {
        getTask()
    }, [getTask])

    if (loading) {
        return <Spinner />
    }

    return (

        <Card sx={{
            // maxWidth: { xs: '100%', md: 345 },
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: task?.done ? 'text.secondary' : "text.primary",
            p: '10px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'border.default',
                pb: '10px',
            }}

            >
                <TaskTitle
                    checked={task?.done as boolean}
                    title={task?.title as string}
                    id={task?._id as string}
                />

                {/* <CheckBox
                    checked={task?.done}
                    setChecked={()=> {}}
                /> */}
            </Box>

            <Typography
                flexGrow={1}
                flexShrink={1}
                flexBasis='auto'
                color={task?.done ? 'text.secondary' : "text.primary"}
                height='100%'
                variant="body2"
                py='20px'
            >
                {task?.text}
            </Typography>

            <TaskInfo
                create={task?.createdAt as string} 
                update={task?.updatedAt as string}
                checked={task?.done as boolean}
                id={task?._id as string}
            />

        </Card>
    )
}





