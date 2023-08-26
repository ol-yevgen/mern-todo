import { Box, Divider, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from "react";

interface TaskInfoTypes {
    create: string,
    update: string
}

export const TaskInfo: FC<TaskInfoTypes>= ({create, update}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box
                    sx={{
                        color: "text.primary",
                        fontSize: '12px',
                        component: "span",
                        width: '50%',
                        height: '100%'
                    }}
                >
                    Created: <br />{create}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                    sx={{
                        color: "text.primary",
                        fontSize: '12px',
                        component: "span",
                        width: '50%',
                        pl: '10px',
                        height: '100%'

                    }}
                >
                    Updated: <br />{update}
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
                <IconButton size="small" color="inherit">
                    <EditIcon />
                </IconButton>

                <IconButton size="small" color="inherit">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    )
}