import { ColorModeButton, Navigation, UserMenu } from '../../index'
import { Box, IconButton, Avatar, Tooltip } from '@mui/material'
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState } from 'react';
import { useHttp } from '../../../hooks/http.hook';

export const MainNav = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    let { loggedIn, logout, name } = useContext(AuthContext)
    const { request } = useHttp()

    const open = Boolean(anchorElUser);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = async() => {
        try {
            await request('/api/auth/logout','POST', {name})
            logout()

        } catch (error) { }
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
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'text.primary', }}>
                                {name?.charAt(0).toUpperCase()}
                            </Avatar>
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