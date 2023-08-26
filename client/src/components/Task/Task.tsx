import { Card,  Typography, Divider, Box } from '@mui/material';
import { useState} from 'react';
import { CheckBox, TaskTitle, TaskInfo } from '../index'

export const Task = () => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <Card sx={{ maxWidth: { sx: '100%', md: 345 }, p: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                <TaskTitle
                    checked={checked}
                    title='Lizard gfdgd'
                />

                <CheckBox
                    checked={checked}
                    setChecked={setChecked}
                />
            </Box>
            <Divider />
            <Typography
                variant="body2"
                color="text.primary"
                py='20px'
            >
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>

            <Divider />

            <TaskInfo
                create='26 Aug 2023'
                update='26 Aug 2023'
            />

        </Card>
    )
}
