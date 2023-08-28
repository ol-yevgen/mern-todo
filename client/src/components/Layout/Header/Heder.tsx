import { AppBar, Box, Toolbar, Container } from '@mui/material'
import { Logo, MainNav, MobileNav } from '../../index'

export const Header = () => {

    return (
        <AppBar position="static" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: { xs: 'none', md: 'flex', alignItems: 'center', },
                        flexGrow: 1
                    }}>
                        <Logo variant='h6'
                            xs='none'
                            md='flex'
                        />
                    </Box>

                    <MobileNav />

                    <Box sx={{
                        pl: { sm: '40px', },
                        display: { xs: 'flex', md: 'none', },
                        alignItems: 'center',
                        flexGrow: 1,
                    }}>
                        <Logo variant='h6'
                            xs='none'
                            md='flex'
                        />
                    </Box>

                    <MainNav />
                </Toolbar>
            </Container>
        </AppBar>
    );
}