import { createContext } from "react";

// export interface LoginTypes {
//     jwtToken: string,
//     id: string
// }

export interface AuthContextTypes {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void,
    token: boolean,
    // token: string | null,
    ready: boolean
}

function noop() { }

export const AuthContext = createContext<AuthContextTypes>({
    isAuthenticated: false,
    login: noop,
    logout: noop,
    token: false,
    ready: false
})