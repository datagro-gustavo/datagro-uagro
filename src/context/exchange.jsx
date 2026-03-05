'use client'

import { createContext, useState } from "react"

import api from "../services/api_precos";

export const ExchangeContext = createContext();


export function ExchangeProvider({ children }) {

    const [exchanges, setExchanges] = useState([]);
    const [contracts, setContractss] = useState([]);

    const get = async () => {
        const response = await api.get(`conversor/contratos`)

        if (response.status !== 200) return;

        setExchanges(response.data.bolsas)
        setContractss(response.data.contratos)
    }


    const value = { exchanges, contracts, get }


    return (
        <ExchangeContext.Provider value={value}>
            {children}
        </ExchangeContext.Provider>
    );
}