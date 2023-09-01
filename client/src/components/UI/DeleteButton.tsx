import { IconButton } from "@mui/material";
import { useCallback } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";

interface DeleteButtonTypes {
    id: string,
}

export const DeleteButton = ({ id, }: DeleteButtonTypes) => {

    const navigate = useNavigate()
    const { request } = useHttp()

    const deleteTask = useCallback(async () => {
        try {
            const isAuth = JSON.parse(localStorage.getItem('isAuth') as string
            ) 
            await request(`/api/tasks/${id}`, 'include', 'DELETE', null, {
                Authorization: `Bearer ${isAuth.token}`
            })

        } catch (error) { }
        navigate('/tasks')

    }, [id, request, navigate])

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