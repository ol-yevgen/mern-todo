import { createContext } from "react";

export interface ColorModeContextTypes {
    toggleColorMode: () => void
}

function noop() { }

export const ColorModeContext = createContext<ColorModeContextTypes>({
    toggleColorMode: noop
})