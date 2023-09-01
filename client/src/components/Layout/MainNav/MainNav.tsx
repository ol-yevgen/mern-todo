import { ColorModeButton, Navigation, UserMenu } from '../../index'
import { Box, IconButton, Avatar, Tooltip } from '@mui/material'
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainNav = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    let { loggedIn, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const open = Boolean(anchorElUser);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        logout()
        navigate('/')
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                    <Navigation handleCloseNavMenu={handleClose} />
                    <ColorModeButton />
                </Box>
                {loggedIn
                    ? <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'text.primary', }}>Y</Avatar>
                        </IconButton>
                    </Tooltip>
                    : null
                }
                
            </Box>
            <UserMenu
                handleClose={handleClose}
                anchorElUser={anchorElUser}
                logoutHandler={logoutHandler} />
        </>

    );
}