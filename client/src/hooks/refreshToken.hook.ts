import { useContext, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { AuthTypes } from '../types/types'

export const useRefreshToken = () => {
    const { logout, persistentLogin} = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(false)

    const { request } = useHttp()

    const refresh = async () => {

        try {
            setLoading(true)

            const data: AuthTypes = await request('/api/auth/refresh', 'POST', null)

            if (!data) {
                logout()
            }

            persistentLogin(data)
        } catch (error) { }
        setLoading(false)
    }

    return { refresh, loading }
}

