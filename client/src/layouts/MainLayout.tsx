import { Header, Footer, Spinner } from "../components/index"
import { AuthContext } from "../context/AuthContext"
import { Box, Container } from "@mui/material"
import { useRoutes } from "../utils/routes"
import { FC, useContext, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom"
import { useRefreshToken } from "../hooks/refreshToken.hook"

export const MainLayout: FC = () => {

    const { auth } = useContext(AuthContext)
    const routes = useRoutes(auth)
    const { refresh, loading } = useRefreshToken()

    const navigate: NavigateFunction = useNavigate()
    const location: Location = useLocation()

    useEffect(() => {
        refresh()
        navigate(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box minHeight='100vh' sx={{ width: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
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
                        <ToastContainer />
                        {loading ? <Spinner /> : routes}
                    </Container>
                </Box>
            </Container>
            <Footer />
        </Box>


    )
}
