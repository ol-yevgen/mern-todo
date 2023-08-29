import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ModalContext } from '../../context/ModalContext';

import {Typography, Paper } from '@mui/material';
import { Input, SubmitButton } from "../../components/index";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/AuthContext';
import { FC, FormEvent } from "react"
import * as yup from 'yup';
import { useHttp } from '../../hooks/http.hook';

const loginSchema = yup.object().shape({
    title: yup
        .string()
        .min(2, 'Minimum 2 characters')
        .required(),
    text: yup
        .string()
        .required()
        .min(2, 'Minimum 2 characters')
})

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

interface TransitionsModalTypes {
    id: string,
    checked: boolean,
    getTask: () => Promise<void>,
    title: string,
    text: string
}

export const TransitionsModal: FC<TransitionsModalTypes> = ({ id, checked, getTask, title, text }) => {
    const { modalAddTask, setModalAddTask} = useContext(ModalContext)
    const handleClose = () => setModalAddTask(false);

    const { request } = useHttp()

    const {
        register,
        getValues,
        formState: {
            errors,
            isValid,
        },
        // handleSubmit,
        reset
    } = useForm(
        {
            defaultValues: {
                title: title,
                text: text
            },
            mode: "onChange",
            resolver: yupResolver(loginSchema)
        }
        )

    const onHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        try {
            const formData = getValues()
            const checkedStatus = { done: checked }
            const bodyData = Object.assign(formData, checkedStatus)

            await request(`/api/tasks/${id}`, 'PATCH', bodyData, {
                // Authorization: `Bearer ${auth.token}`
            })

            handleClose()
            getTask()
            reset();

        } catch (error) { }

    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalAddTask}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 400,
                },
            }}
        >
            <Fade in={modalAddTask}>
                <Box sx={style}>
                    <Paper  sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px'}}>
                        <Typography component="h1" variant="h5">
                            Edit task
                        </Typography>
                        <form
                            autoComplete='off'
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            <Input
                                label='title'
                                name='title'
                                error={errors?.title}
                                register={register}
                            />
                            <Input
                                label='text'
                                name='text'
                                error={errors?.text}
                                register={register}
                            />

                            <SubmitButton
                                label='Update'
                                onHandleSubmit={onHandleSubmit}
                                isValid={isValid}
                            />
                        </form>
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
}
