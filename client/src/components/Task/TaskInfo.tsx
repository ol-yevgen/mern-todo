import { Box, Divider, IconButton } from "@mui/material"
import { formateDate } from '../../utils/formateDate'
import { useHttp } from "../../hooks/http.hook";
import EditIcon from '@mui/icons-material/Edit';
import { Spinner, DeleteButton, TaskActions } from "../index";
import { FC, useContext } from "react";


interface TaskInfoTypes {
    create: string,
    update: string,
    checked: boolean,
    id: string,
    actions: boolean
}

export const TaskInfo: FC<TaskInfoTypes> = ({ create, update, checked, id, actions }) => {
    const { loading } = useHttp()

    if (loading) {
        return <Spinner />
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

            {
                actions ?
                    <>
                        <Divider orientation="vertical" flexItem />
                        <TaskActions id={id} />
                    </>
                    : null
            }

        </Box>
    )
}