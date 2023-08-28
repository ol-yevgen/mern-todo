import { useCallback, useState } from 'react';
import { TaskType } from '../types/types'
import { useNavigate } from 'react-router-dom';

export const useDoneTask = (
    id: string,
    tasksList: TaskType[],
    setListWithDeletedTask: React.Dispatch<React.SetStateAction<TaskType[]>>,
    request: (url: string, method?: string, body?: any, headers?: Record<string, string>) => Promise<any>,
) => {
    // const [checked, setChecked] = useState<boolean>(done);

    const navigate = useNavigate()

    const deleteTask = useCallback(async () => {
        const deletedTask = tasksList.filter(task => task._id !== id)
        setListWithDeletedTask(deletedTask)
        try {
            await request(`/api/tasks/${id}`, 'DELETE', null)

        } catch (error) { }
        navigate('/tasks')

    }, [id, request, tasksList, setListWithDeletedTask, navigate])

    return deleteTask
}
