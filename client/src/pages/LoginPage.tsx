import { Container, Typography, Paper } from '@mui/material';
import { Input, SubmitButton } from "../components/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/AuthContext';
import { AccountCircle } from '@mui/icons-material';
import { FC, useContext } from "react"
import * as yup from 'yup';

interface IFormInputs {
    email: string,
    password: string
}

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(2, 'Minimum 2 characters')
        .max(60, 'Maximum 60 characters')
        .required()
        // eslint-disable-next-line no-control-regex
        .matches(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, 'The email must be a valid email address.'),
    password: yup
        .string()
        .required()
        .min(6, 'Minimum 6 characters')
})

export const LoginPage: FC = () => {
    let { login } = useContext(AuthContext)

    const {
        register,
        getValues,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset
    } = useForm(
        {
            defaultValues: {
                email: "",
                password: ""
            },
            mode: "onChange",
            resolver: yupResolver(loginSchema)
        }
    )

    const onHandleSubmit: SubmitHandler<IFormInputs> = () => {
        console.log(getValues());

        login()
        reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AccountCircle sx={{ fontSize: '64px', mb: 2 }} />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    autoComplete='off'
                    onSubmit={handleSubmit(onHandleSubmit)}
                    style={{ width: '100%', marginTop: '1rem' }}
                >
                    <Input
                        label='email'
                        name='email'
                        error={errors?.email}
                        register={register}
                    />
                    <Input
                        label='password'
                        name='password'
                        error={errors?.password}
                        register={register}
                    />

                    <SubmitButton
                        label='Sign In'
                        onHandleSubmit={onHandleSubmit}
                        isValid={isValid}
                    />
                </form>
            </Paper>
        </Container>
    );
}
