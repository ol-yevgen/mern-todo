import { Card, Typography, Box } from '@mui/material';
import { FC, useState } from 'react';
import { CheckBox, TaskTitle, TaskInfo } from '../index'
import { TaskType as TaskModel } from '../../types/types';
import { capitalizeFirstWord } from '../../utils/capitalizeFirstWord';

interface TaskProps {
    data: TaskModel,
}

export const Task: FC<TaskProps> = ({ data }) => {
    const { title, text, done, createdAt, updatedAt, _id} = data
    const [checked, setChecked] = useState<boolean>(done);

    return (
        <Card sx={{
            maxWidth: { xs: '100%', md: 345 },
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: checked ? 'text.secondary' : "text.primary",
            p: '10px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'border.default',
                pb: '10px',
            }}

            >
                <TaskTitle
                    checked={checked}
                    title={title}
                    id={_id}
                />

                <CheckBox
                    checked={checked}
                    setChecked={setChecked}
                    id={_id}
                />
            </Box>

            <Typography
                color={checked ? 'text.secondary' : "text.primary"}
                height='100%'
                variant="body2"
                py='20px'
            >
                {capitalizeFirstWord(text)}
            </Typography>

            <TaskInfo
                create={createdAt}
                update={updatedAt}
                checked={checked}
                id={_id}
                actions={false}
            />

        </Card>
    )
}
