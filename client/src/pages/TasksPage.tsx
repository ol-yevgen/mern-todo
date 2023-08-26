import { FC } from "react"
import { Task } from "../components/index"
import { Box } from "@mui/material"

export const TasksPage: FC = (props) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', lg: 'flex-start' }, gap: '30px', width: '100%'}}>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
        </Box>
    )
}