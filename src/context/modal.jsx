'use client'

import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {

    const [modalLogin, setModalLogin] = useState('false')
    const [modalLetters, setModalLetters] = useState(false)
    return (
        <ModalContext.Provider value={{
            setModalLogin,
            modalLogin,
            setModalLetters,
            modalLetters
        }}>
            {children}
        </ModalContext.Provider>
    );
}