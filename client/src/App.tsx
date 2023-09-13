import { FC } from "react"
import { AuthProvider } from './context/AuthContext'
import { MainLayout } from './layouts/MainLayout'
import { ColorModeProvider } from './context/ColorModeContext'
import { BrowserRouter as Router } from 'react-router-dom'

export const App: FC = () => {

    return (
        <ColorModeProvider>
            <AuthProvider>
                <Router>
                    <MainLayout />
                </Router>
            </AuthProvider>
        </ColorModeProvider>
    )
}
