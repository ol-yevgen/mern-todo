import { Checkbox } from '@mui/material';
import { FC } from 'react';

interface CheckBoxType {
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckBox: FC<CheckBoxType> = ({ checked, setChecked }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
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