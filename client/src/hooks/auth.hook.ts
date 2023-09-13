import { useCallback, useState, useEffect } from "react"
import { useHttp } from "./http.hook"
import { AuthTypes, StorageDataTypes, ReqTokenType } from "../types/types"

const storageAuth = 'isAuth'

export const useAuth = () => {

    const { request } = useHttp()
    const [auth, setAuth] = useState<AuthTypes | null>(null)
    // const [auth, setAuth] = useState<AuthTypes>({userName: null, accessToken: null})

    const login = useCallback((authData: AuthTypes) => {
        setAuth(authData)
        localStorage.setItem(storageAuth, JSON.stringify({ userName: authData.userName, userId: authData.userId }))

    }, [])

    const persistentLogin = useCallback((accessToken: string) => {
        if (!!accessToken) {
            const storageData: StorageDataTypes = JSON.parse(localStorage.getItem(storageAuth) as string) 
            setAuth({ userName: storageData.userName, accessToken: accessToken, userId: storageData.userId })
        }
    }, [])
    
    const logout = useCallback(() => {
        setAuth(null)
        localStorage.removeItem(storageAuth)
    }, [])

    useEffect(() => {
        if (!!auth?.accessToken) {
            const interval = setTimeout(async () => {
                try {
                    const data: ReqTokenType = await request('/api/auth/refresh', 'POST')

                    if (!data) {
                        logout()
                    }

                    setAuth({ ...auth, accessToken: data.accessToken })

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