import { ColorModeContext } from '../../context/ColorModeContext'
import { useTheme, Box, IconButton } from '@mui/material';
import { FC, useContext } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export const ColorModeButton: FC = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                width: '100%',
                height: '100%',
                pl: 1,
                pr: 1
            }}
        >
            {/* {theme.palette.mode} mode */}
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: 'text.primary' }} /> : <Brightness4Icon sx={{ color: 'text.primary' }} />}
            </IconButton>
        </Box>
    )
}