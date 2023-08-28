import { TasksContext } from "../../context/TasksContext";
import { Box, Divider, IconButton } from "@mui/material"
import { useDeleteTask } from '../../utils/deleteTask'
import { formateDate } from '../../utils/formateDate'
import DeleteIcon from '@mui/icons-material/Delete';
import { useHttp } from "../../hooks/http.hook";
import EditIcon from '@mui/icons-material/Edit';
import { FC, useContext } from "react";
import { Spinner } from "../UI/Spinner";

interface TaskInfoTypes {
    create: string,
    update: string,
    checked: boolean,
    id: string,
}

export const TaskInfo: FC<TaskInfoTypes> = ({ create, update, checked, id }) => {
    const { request, loading } = useHttp()
    const { tasks, setTasks } = useContext(TasksContext)
    const deleteTask = useDeleteTask(id, tasks, setTasks, request)

    if (loading) {
        return <Spinner/>
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: 1,
            borderColor: 'border.default',
            pt: '10px'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                <Box
                    sx={{
                        color: checked ? 'text.secondary' : "text.primary",
                        fontSize: '12px',
                        component: "span",
                        width: '50%',
                        height: '100%'
                    }}
                >
                    Created: <br />{formateDate(create)}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                    sx={{
                        color: checked ? 'text.secondary' : "text.primary",
                        fontSize: '12px',
                        component: "span",
                        width: '50%',
                        pl: '10px',
                        height: '100%'

                    }}
                >
                    Updated: <br />{formateDate(update)}
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
                <IconButton size="small" color="inherit">
                    <EditIcon />
                </IconButton>

                <IconButton
                    size="small"
                    color="inherit"
                    onClick={deleteTask}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    )
}