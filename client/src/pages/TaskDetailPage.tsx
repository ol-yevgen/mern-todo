import { Card, Typography, Box } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { CheckBox, TaskTitle, TaskInfo, Spinner } from '../components/index'
import { TaskType as TaskModel } from '../types/types';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { ModalContext } from '../context/ModalContext'

import { TransitionsModal } from '../components/Modal/Modal'

export const TaskDetailPage: FC = () => {
    const [task, setTask] = useState<TaskModel>();
    const [checked, setChecked] = useState(task?.done as boolean);
    const [modalAddTask, setModalAddTask] = useState<boolean>(false)
    const { request, loading } = useHttp()
    const taskId = useParams().id as string

    const getTask = useCallback(async () => {
        try {
            const fetched = await request(`/api/tasks/${taskId}`, 'GET', null)
            setTask(fetched)
            setChecked(fetched.done)
        } catch (error) { }

    }, [taskId, request])

    useEffect(() => {
        getTask()
    }, [getTask])

    if (loading) {
        return <Spinner />
    }

    return (
        < ModalContext.Provider value={{ modalAddTask, setModalAddTask }}>
            {modalAddTask
                ? <TransitionsModal
                    id={taskId}
                    checked={checked}
                    getTask={getTask}
                    title={task?.title as string} 
                    text={task?.text as string}
                />
                : null}
            <Card sx={{
                maxWidth: { xs: '100%', md: 700 },
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: checked ? 'text.secondary' : "text.primary",
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
                        checked={checked as boolean}
                        title={task?.title as string}
                        id={task?._id as string}
                    />

                    <CheckBox
                        checked={checked}
                        setChecked={setChecked}
                        id={taskId}
                    />
                </Box>

                <Typography
                    flexGrow={1}
                    flexShrink={1}
                    flexBasis='auto'
                    color={checked ? 'text.secondary' : "text.primary"}
                    minHeight='150px'
                    height='100%'
                    variant="body2"
                    py='20px'
                >
                    {task?.text}
                </Typography>

                <TaskInfo
                    create={task?.createdAt as string}
                    update={task?.updatedAt as string}
                    checked={checked as boolean}
                    id={task?._id as string}
                    actions={true}
                />

            </Card>
        </ ModalContext.Provider>

    )
}





