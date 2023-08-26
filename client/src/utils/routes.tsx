import { Routes, Route, Navigate } from 'react-router-dom'
import { RegistrationPage } from '../pages/RegistrationPage'
import { LoginPage } from '../pages/LoginPage'
import { TasksPage } from '../pages/TasksPage'
import { ProfilePage } from '../pages/ProfilePage'
import { TaskDetailPage } from '../pages/TaskDetailPage'
import { AddNewTaskPage } from '../pages/AddNewTaskPage'
import { SettingsPage } from '../pages/SettingsPage'

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route
                    path='/tasks'
                    element={<TasksPage />}
                />
                <Route
                    path='/profile'
                    element={<ProfilePage />}
                />
                <Route
                    path='/task/:id'
                    element={<TaskDetailPage />}
                />
                <Route
                    path='/add'
                    element={<AddNewTaskPage />}
                />
                <Route
                    path='/settings'
                    element={<SettingsPage />}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/tasks" />}
                />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route
                    path='/login'
                    element={<LoginPage />}
                />
                <Route
                    path='/registration'
                    element={<RegistrationPage />}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/login" />}
                />
            </Routes>
        )


    }
}