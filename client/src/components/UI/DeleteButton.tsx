import { IconButton } from "@mui/material";
import { useCallback, useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

interface DeleteButtonTypes {
    id: string,
}

export const DeleteButton = ({ id, }: DeleteButtonTypes) => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { request } = useHttp()

    const deleteTask = useCallback(async () => {
        try {
            await request(`/api/tasks/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth?.accessToken}`
            })

        } catch (error) { }
        navigate('/tasks')

    }, [id, request, navigate, auth?.accessToken])

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