import { PropsWithChildren, createContext } from "react";
import { useToggleColorMode } from "../utils/toggleColorMode";
import { ThemeProvider } from "@emotion/react";

interface ColorModeContextTypes {
    toggleColorMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextTypes>({
    toggleColorMode: () => { }
})

export const ColorModeProvider = ({ children }: PropsWithChildren<{}>) => {
    const { colorMode, theme } = useToggleColorMode()

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
