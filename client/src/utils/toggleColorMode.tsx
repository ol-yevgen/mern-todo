import { createTheme } from '@mui/material/styles';
import { useMemo, useState } from "react";
import { teal, blueGrey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const useToggleColorMode = () => {
    const storageMode = 'mode'

    const storageColorMode = localStorage.getItem(storageMode) as Exclude<'light' | 'dark', null>
    const defaultMode = storageColorMode !== null ? storageColorMode : 'light'

    const [mode, setMode] = useState<'light' | 'dark'>(defaultMode);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
                localStorage.setItem(
                    storageMode,
                    mode === 'light' ? 'dark' : 'light'
                )
            },
        }),
        [mode],
    );

    const getDesignTokens = (mode: PaletteMode) => ({
        palette: {
            mode,
            background: {
                ...(mode === 'dark'
                    ? {

                        default: '#0a2323',
                        paper: '#0a2323',
                        hover: '#c3f1f2',
                        disabled: '#afafaf',
                    }
                    : {
                        default: blueGrey[50],
                        paper: blueGrey[100],
                        hover: '#016461',
                        disabled: '#253e3e',
                    }
                )
            },
            text: {
                ...(mode === 'light'
                    ? {
                        primary: teal[900],
                        // secondary: teal[900],
                    }
                    : {
                        primary: teal[50],
                        // secondary: teal[50],
                    }),
            },
        },
    });

    const theme = useMemo(
        () =>
            createTheme(getDesignTokens(`${mode}`)),
        [mode],
    );

    return { colorMode, theme }
}