import { Typography, TypographyTypeMap } from "@mui/material"
import { AuthContext } from '../../context/AuthContext';

import { FC, useContext} from "react"
import { Link } from "react-router-dom"
interface LogoTypes {
    variant?: TypographyTypeMap["props"]["variant"],
    xs: string,
    md: string
}

export const Logo: FC<LogoTypes> = ({ variant, xs, md }) => {
    const { auth } = useContext(AuthContext)
    const nav = auth?.accessToken ? '/tasks' : '/'

    return (
        <Link to={nav}>
            <Typography
                variant={variant}
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: { xs }, md: { md }, alignItems: 'center' },
                    alignItems: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'text.primary',
                    textDecoration: 'none',
                }}
            >
                MERN ToDo
            </Typography>
        </Link>
    )
}