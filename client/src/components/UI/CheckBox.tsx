import { Checkbox } from '@mui/material';
import { FC, useCallback, useContext } from 'react';
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from '../../context/AuthContext';

interface CheckBoxType {
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

export const CheckBox: FC<CheckBoxType> = ({ checked, setChecked, id }) => {

    const { auth } = useContext(AuthContext)
    const { request } = useHttp()

    const doneTask = useCallback(async () => {
        try {
            await request(`/api/tasks/${id}`, 'PATCH', { done: !checked }, {
                Authorization: `Bearer ${auth?.accessToken}`
            })

        } catch (error) { }
    }, [request, id, checked, auth?.accessToken])

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