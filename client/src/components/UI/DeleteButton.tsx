import { IconButton } from "@mui/material";
import { useCallback } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskType } from '../../types/types'
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";

interface DeleteButtonTypes {
    id: string,
    tasksList: TaskType[],
    setListWithDeletedTask: React.Dispatch<React.SetStateAction<TaskType[]>>,
}

export const DeleteButton = ({ id, tasksList, setListWithDeletedTask }: DeleteButtonTypes) => {

    const navigate = useNavigate()
    const { request } = useHttp()

    const deleteTask = useCallback(async () => {
        const deletedTask = tasksList.filter(task => task._id !== id)
        setListWithDeletedTask(deletedTask)
        try {
            await request(`/api/tasks/${id}`, 'DELETE', null)

        } catch (error) { }
        navigate('/tasks')

    }, [id, request, tasksList, setListWithDeletedTask, navigate])

    return (
        <IconButton
            size="small"
            color="inherit"
            onClick={deleteTask}
        >
            <DeleteIcon />
        </IconButton>
    )
}