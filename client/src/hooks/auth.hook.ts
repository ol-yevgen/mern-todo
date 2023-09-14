import { useCallback, useState, useEffect } from "react"
import { useHttp } from "./http.hook"
import { AuthTypes } from "../types/types"

// const storageAuth = 'isAuth'

export const useAuth = () => {

    const { request } = useHttp()
    const [auth, setAuth] = useState<AuthTypes | null>(null)
    // const [auth, setAuth] = useState<AuthTypes>({userName: null, accessToken: null})

    const login = useCallback((authData: AuthTypes) => {
        setAuth(authData)
        // localStorage.setItem(storageAuth, JSON.stringify({ userName: authData.userName, userId: authData.userId }))

    }, [])

    const persistentLogin = useCallback((authData: AuthTypes) => {
        if (!!authData) {
            // const storageData: StorageDataTypes = JSON.parse(localStorage.getItem(storageAuth) as string)
            const { userName, accessToken, userId} = authData
            setAuth({ userName: userName, accessToken: accessToken, userId: userId })
            // setAuth({ userName: storageData.userName, accessToken: accessToken, userId: storageData.userId })
        }
    }, [])
    
    const logout = useCallback(() => {
        setAuth(null)
        // localStorage.removeItem(storageAuth)
    }, [])

    useEffect(() => {
        if (!!auth?.accessToken) {
            const interval = setTimeout(async () => {
                try {
                    const data: AuthTypes = await request('/api/auth/refresh', 'POST', null)

                    if (!data) {
                        logout()
                    }

                    setAuth(data)

                } catch (error) { }

            }, 10 * 60 * 1000)

            return () => {
                clearTimeout(interval)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, request])
    
    return { login, logout, auth, persistentLogin}

}