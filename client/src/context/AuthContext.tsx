import { PropsWithChildren, createContext } from "react";
import { useAuth } from "../hooks/auth.hook";
import { AuthTypes } from "../types/types"

export interface AuthContextTypes {
    login: (authData: AuthTypes) => void,
    logout: () => void,
    persistentLogin: (accessToken: string) => void,
    auth: AuthTypes | null
}

function noop() { }

export const AuthContext = createContext<AuthContextTypes>({
    login: noop,
    logout: noop,
    persistentLogin: noop,
    auth: null
})

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const { login, logout, auth, persistentLogin } = useAuth()

    return (

        <AuthContext.Provider value={{ login, logout, auth, persistentLogin }}>
            {children}
        </AuthContext.Provider>

    )
}