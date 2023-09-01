import { FC, useContext } from 'react';
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

export const Navigation: FC<NavigationType> = ({ handleCloseNavMenu }) => {
    const { loggedIn } = useContext(AuthContext)
    const nav = loggedIn ? authNav : notAuthNav

    return (
        <>
            {nav.map((page) => (
                <Link key = { page.title } to={page.route}>
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ width: '110px',my: 1, px: 2, color: "text.primary", display: 'block' }}
                    >
                        {page.title}
                    </Button>
                </Link>
            ))}
        </>
    );
}