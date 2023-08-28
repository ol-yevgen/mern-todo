import { createContext } from "react";

export interface AppContextTypes {
    anchorElNav: null | HTMLElement,
    anchorElUser: null | HTMLElement,
}

// function noop() { }

export const AppContext = createContext<AppContextTypes>({
    anchorElNav: null,
    anchorElUser: null,
})