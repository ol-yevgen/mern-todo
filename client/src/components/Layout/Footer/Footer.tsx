import { Box, Container } from "@mui/material"
import { FC } from "react"

export const Footer: FC = (props) => {
    return (
        <Box sx={
            {
                width: '100%',
                bgcolor: 'background.paper',
            }}>
            <Container maxWidth='xl' sx={
                {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'text.primary',
                    p: '20px'
                }}>
                Footer
            </Container>
        </Box>
    )
}