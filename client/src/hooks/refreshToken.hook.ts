import { useContext, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { ReqTokenType } from '../types/types'

export const useRefreshToken = () => {
    const { logout, persistentLogin } = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(false)

    const { request } = useHttp()

    const refresh = async () => {

        if (localStorage.getItem('isAuth') !== null) {

            try {
                setLoading(true)

                const data: ReqTokenType = await request('/api/auth/refresh', 'POST')

                if (!data) {
                    logout()
                }

                persistentLogin(data.accessToken)
            } catch (error) { }
            setLoading(false)

        }
        
    }

    return { refresh, loading }
}