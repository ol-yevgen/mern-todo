import { useCallback, useState, useEffect } from "react"

const storageAuth = 'isAuth'

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [ready, setReady] = useState<boolean>(false)
    const [userId, setUserId] = useState<string | null>(null)


    const login = useCallback((loggedIn: boolean, name: string, token: string, id: string) => {

        setAuthToken(token)
        setLoggedIn(loggedIn)
        setName(name)
        setUserId(id)
        localStorage.setItem(storageAuth, JSON.stringify({ loggedIn: loggedIn, token: token, userId: id, userName: name }))

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
            const { loggedIn, token, userId, userName } = data

            login(loggedIn, userName, token, userId)
            setName(userName)
            setAuthToken(token)
            setLoggedIn(loggedIn)
            setUserId(userId)
        }

        setReady(true)
    }, [login])

    useEffect(() => {
        const sessionTimeOut = setTimeout(() => {
            logout()
        },  59 * 60 * 1000)

        return () => clearTimeout(sessionTimeOut)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return { login, logout, name, authToken, loggedIn, userId, ready}

}