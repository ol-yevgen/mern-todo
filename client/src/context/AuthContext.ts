import { createContext } from "react";

export interface AuthContextTypes {
    login: (loggedIn: boolean,
        name: string,
        authToken: string,
        id: string) => void,
    logout: () => void,
    name: string | null,
    authToken: string | null,
    loggedIn: boolean,
    userId: string | null,
    ready: boolean
}

function noop() { }

export const AuthContext = createContext<AuthContextTypes>({
    login: noop,
    logout: noop,
    name: null,
    authToken: null,
    loggedIn: false,
    userId: null,
    ready: false
})