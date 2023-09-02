import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { Spinner } from "../components"
import { AuthContext } from "../context/AuthContext"
import { Box, Container, Typography } from "@mui/material"

interface UserInfo {
    doneTasks: number | null,
    inProgressTasks: number | null,
    totalTasks: number | null,
    userEmail: string | null,
}

export const ProfilePage: FC = () => {
    const { request, loading } = useHttp()
    const [user, setUser] = useState<UserInfo | null>(null);
    const { userId, name } = useContext(AuthContext)

    const getProfileInfo = useCallback(async () => {
        try {
            const isAuth = JSON.parse(localStorage.getItem('isAuth') as string
            )
            const fetchedUser = await request(`/api/user/${userId}`, 'include', 'GET', 'cors', null, {
                Authorization: `Bearer ${isAuth.token}`
            })
            setUser(fetchedUser)
            console.log(fetchedUser);
            
        } catch (error) { }

    }, [request, userId])

    useEffect(() => {
        getProfileInfo()
    }, [getProfileInfo])

    if (loading) {
        return <Spinner />
    }

    return (
        <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'center', p: 0 }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%'  }}>
                <Typography component="h1" variant="h5" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                    Full name:
                    <Box component='span' sx={{ ml: '10px', fontWeight: 'bold', }}>
                        {name}
                    </Box>
                </Typography>
                <Typography component="h2" variant="h5" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mt: '10px' }}>
                    Email:
                    <Box component='span' sx={{ ml: '10px', fontWeight: 'bold' }}>
                        { user?.userEmail}
                    </Box>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-around', gap: '30px', mt: '100px', width: '100%'}} >
                    <Typography component="h3" variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Total tasks
                        <Box component='span' sx={{ mt: '15px', fontWeight: 'bold' }}>
                            {user?.totalTasks}
                        </Box>
                    </Typography>
                    <Typography component="h3" variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Done tasks
                        <Box component='span' sx={{ mt: '15px', fontWeight: 'bold' }}>
                            {user?.doneTasks}
                        </Box>
                    </Typography>
                    <Typography component="h3" variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        In progress
                        <Box component='span' sx={{ mt: '15px', fontWeight: 'bold' }}>
                            {user?.inProgressTasks}
                        </Box>
                    </Typography>
                    
                </Box>
            </Box>
        </Container>
 
    )
}