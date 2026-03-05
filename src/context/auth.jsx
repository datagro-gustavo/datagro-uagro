'use client'

import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();
const MAP = { pt: "pt-br", en: "en-us" };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    // const [cookies, setCookie] = useCookies();
    // TODO: Implementar lógica de autenticação real
    // TODO: Buscar os cookies de autenticação e definir o estado do usuário
//     const login = () => {
//         setCookie("login", "thiago.vieira@datagro.com", {
//         path: "/",
//         // domain: ".datagro.com", 
//         secure: false,
//         sameSite: "lax",
//         });
//     };

//   const displayNameC = () => {
//         setCookie("displayName", "Thiago Vieira", {
//         path: "/",
//         // domain: ".datagro.com", 
//         secure: false,
//         sameSite: "lax",
//         });
        
//     };


    
//     console.log("AUTH CONTEXT - COOKIES:", cookies.login);

//     useEffect(() => {
//         // login();
//         // setUser(cookies.login || null);
//         displayNameC();
//         setDisplayName(cookies.displayName || null);
//     }, [cookies.login, cookies.displayName]);

    
    const values = {
        user,
        displayName,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>    
    )
}
