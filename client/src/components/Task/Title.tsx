import { Typography } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { MouseOverPopover } from '../index'

interface TaskTitleTypes {
    checked: boolean,
    title: string,
    id: string
}

export const TaskTitle: FC<TaskTitleTypes> = ({ checked, title, id }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


    return (
        <Link
            to={`/tasks/${id}`}
            className="task__title"
        >
            <Typography
                color={checked ? 'text.secondary' : "text.primary"}
                textOverflow='ellipsis'
                width='100%'
                noWrap
                gutterBottom
                variant="h5"
                m='0'
                position='relative'
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={checked
                    ? {
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: '50%',
                            left: -5,
                            width: "105%",
                            height: 2,
                            bgcolor: 'text.secondary',
                            transform: 'translate(0, -50%)',
                            transition: 'all .5s',
                            zIndex: 0,
                        }
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
            <MouseOverPopover
                anchorEl={anchorEl}
                open={open}
                handlePopoverClose={handlePopoverClose}
                checked={checked}
            />
        </Link>

    )
}