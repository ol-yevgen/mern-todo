import { Dispatch, SetStateAction, createContext } from "react";

export interface ModalContextTypes {
    modalAddTask: boolean,
    setModalAddTask: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextTypes>({
    modalAddTask: false,
    setModalAddTask: () => { }
})