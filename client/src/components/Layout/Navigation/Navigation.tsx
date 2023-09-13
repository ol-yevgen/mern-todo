import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { AuthContext } from '../../../context/AuthContext';

const authNav = [
    {
        title: 'All tasks',
        route: '/tasks',
    },
    {
        title: 'New task',
        route: '/add',
    },
];
const notAuthNav = [
    {
        title: 'Login',
        route: '/',
    },
    {
        title: 'Sign Up',
        route: '/registration',
    },
]

interface NavigationType {
    handleCloseNavMenu: () => void,
}

export const Navigation = ({ handleCloseNavMenu }: NavigationType) => {
    const { auth } = useContext(AuthContext)
    const accessToken = auth?.accessToken
    const nav = !!accessToken ? authNav : notAuthNav

    return (
        <>
            {
                nav.map((page) => (
                    <Link key={page.title} to={page.route}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ width: '110px', my: 1, px: 2, color: "text.primary", display: 'block' }}
                        >
                            {page.title}
                        </Button>
                    </Link>
                ))}
        </>
        
    );
}