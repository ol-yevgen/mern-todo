import { Box, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { DeleteButton } from "../UI/DeleteButton";
import { ModalContext } from '../../context/ModalContext';
import { TasksContext } from "../../context/TasksContext";
import { FC, useContext } from "react";

interface TaskActionsTypes {
    id: string
}

export const TaskActions: FC<TaskActionsTypes>= ({id}) => {
    const { tasks, setTasks } = useContext(TasksContext)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { modalAddTask, setModalAddTask } = useContext(ModalContext)
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '30%' }}>
            <IconButton
                size="small"
                color="inherit"
                onClick={() => setModalAddTask(true)}
            >
                <EditIcon />
            </IconButton>

            <DeleteButton
                id={id}
                tasksList={tasks}
                setListWithDeletedTask={setTasks}
            />
        </Box>
    )
}