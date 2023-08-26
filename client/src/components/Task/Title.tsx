import { Typography } from "@mui/material";
import { FC } from "react";

interface TaskTitleTypes {
    checked: boolean,
    title: string
}

export const TaskTitle: FC<TaskTitleTypes> = ({ checked, title }) => {
    return (
        <>
            <Typography
                color="text.primary"
                gutterBottom
                variant="h5"
                m='0'
                position='relative'
                sx={checked
                    ? {
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: '50%',
                            left: -5,
                            width: "120%",
                            height: 2,
                            bgcolor: 'text.primary',
                            transform: 'translate(0, -50%)',
                            transition: 'all .5s',
                            zIndex: 0,
                        },
                    }
                    : {
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: '50%',
                            left: '-200%',
                            width: "120%",
                            height: 2,
                            bgcolor: 'text.primary',
                            transform: 'translate(0, -50%)',
                            transition: 'all .5s',
                            zIndex: 0,
                        },
                    }
                }
            >
                {title}
            </Typography>
        </>
    )
}