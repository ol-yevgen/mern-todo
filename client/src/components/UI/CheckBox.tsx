import { Checkbox } from '@mui/material';
import { FC, useCallback } from 'react';
import { useHttp } from "../../hooks/http.hook"

interface CheckBoxType {
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

export const CheckBox: FC<CheckBoxType> = ({ checked, setChecked, id }) => {

    const { request } = useHttp()

    const doneTask = useCallback(async () => {
        try {
            const isAuth = JSON.parse(localStorage.getItem('isAuth') as string
            ) 
            await request(`/api/tasks/${id}`, 'include', 'PATCH', 'cors',{ done: !checked }, {
                Authorization: `Bearer ${isAuth.token}`
            })

        } catch (error) { }
    }, [request, id, checked])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        doneTask()
    };

    return (
        <Checkbox
            sx={{
                    color: 'text.primary',
                    '&.Mui-checked': {
                        color: 'text.secondary',
                    },
                }}
            checked={checked}
            onChange={handleChange}
        />
    )
}