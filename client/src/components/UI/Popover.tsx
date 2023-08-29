import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface MouseOverPopoverTypes {
    anchorEl: HTMLElement | null,
    open: boolean,
    handlePopoverClose: () => void,
    checked: boolean
}

export const MouseOverPopover: FC<MouseOverPopoverTypes> = ({ anchorEl, open, handlePopoverClose, checked }) =>  {

    const textColor = checked ? 'text.secondary' : "text.primary"
    
    return (
        <div>

            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1, color: textColor }}>View details</Typography>
            </Popover>
        </div>
    );
}