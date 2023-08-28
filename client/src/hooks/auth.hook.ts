import { useCallback, useState, useEffect} from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState<boolean>(true)
    const [ready, setReady] = useState<boolean>(false)
    const [userId, setUserId] = useState<string | null>(null)

    // const login = useCallback((jwtToken: string, id: string) => {
    //     setToken(jwtToken)
    //     setUserId(id)

    //     localStorage.setItem(storageName, JSON.stringify({
    //         token: jwtToken, userId: id
    //     }))
    // }, [])

    const login = useCallback(() => {
        setToken(true)

        localStorage.setItem(storageName, JSON.stringify({
            token
        }))
    }, [token])
    
    const logout = useCallback(() => {
        setToken(false)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName ) as string ) as boolean

        if (data) {
            login()
        }

        setReady(true)

    }, [login])
    
    return { login, logout, token, userId, ready}

}