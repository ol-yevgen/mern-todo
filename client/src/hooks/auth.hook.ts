import { useCallback, useState, useEffect } from "react"

const storageAuth = 'isAuth'

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [ready, setReady] = useState<boolean>(false)
    const [userId, setUserId] = useState<string | null>(null)

    const login = useCallback((loggedIn: boolean, token: string, id: string) => {

        setAuthToken(token)
        setLoggedIn(loggedIn)
        setUserId(id)
        localStorage.setItem(storageAuth, JSON.stringify({ loggedIn: loggedIn, token: token, userId: id,}))

    }, [])
    
    const logout = useCallback(() => {
        setLoggedIn(false)
        setUserId(null)
        localStorage.removeItem(storageAuth)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageAuth) as string
        ) 
        if (data) {
            const { loggedIn, token, userId, } = data

            login(loggedIn, token, userId)
            setAuthToken(token)
            setLoggedIn(loggedIn)
            setUserId(userId)
        }

        setReady(true)

    }, [login])
    
    return { login, logout, authToken, loggedIn, userId, ready}

}