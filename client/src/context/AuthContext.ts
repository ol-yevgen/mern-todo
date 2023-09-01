import { createContext } from "react";

export interface AuthContextTypes {
    login: (loggedIn: boolean,
        authToken: string,
        id: string) => void,
    logout: () => void,
    authToken: string | null,
    loggedIn: boolean,
    userId: string | null,
    ready: boolean
}

function noop() { }

export const AuthContext = createContext<AuthContextTypes>({
    login: noop,
    logout: noop,
    authToken: null,
    loggedIn: false,
    userId: null,
    ready: false
})