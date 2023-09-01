import { FC } from "react"
import { AuthContext } from './context/AuthContext'
import { MainLayout } from './layouts/MainLayout'
import { useToggleColorMode } from './utils/toggleColorMode'
import { ColorModeContext } from './context/ColorModeContext'
import { ThemeProvider } from '@mui/material/styles';


import { useAuth } from "./hooks/auth.hook"

export const App: FC = () => {
    const { colorMode, theme } = useToggleColorMode()
    const { loggedIn, login, authToken, logout, userId, ready } = useAuth()

    return (
         <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AuthContext.Provider value={{
                    login, logout, authToken, loggedIn, ready, userId
                }}>
                    <MainLayout />
                </AuthContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
