import { BrowserRouter as Router } from 'react-router-dom'
import { Header, Footer } from "../components/index"
import { AuthContext } from "../context/AuthContext"
import { Box, Container } from "@mui/material"
import { useRoutes } from "../utils/routes"
import { FC, useContext } from "react"

export const MainLayout: FC = () => {

    const auth = useContext(AuthContext)
    const routes = useRoutes(auth.isAuthenticated)

    return (
        <Router>
                <Box minHeight='100vh' sx={{ width: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default'}}>
                    <Header />
                    <Container maxWidth='xl' sx={
                        {
                            width: '100%',
                            p: '30px 0',
                            display: 'flex',
                            flexGrow: '1',
                            flexShrink: '1',
                            flexBasis: 'auto',
                            color: 'text.primary',
                        }
                    }>
                        <Box component="main" maxWidth="xl" >
                            <Container sx={
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    px: { xs: '20px', sm: '0' }
                                }
                            }>
                                {routes}
                            </Container>
                        </Box>
                    </Container>
                    <Footer />
                </Box>
            </Router>

    )
}
