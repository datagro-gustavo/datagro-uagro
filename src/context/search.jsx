'use client'

import { createContext, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import api from "../services/api";
export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [name, setName] = useState()
    const [search, setSearch] = useState(false)
    const [data, setData] = useState([])
    const [animation, setAnimation] = useState(false)
    const [dataQuote, setDataQuote] = useState([])

    const get = async (name) => {
        if (!name) {
            setData([]);
            return false;
        }
        setAnimation(true)
        const maxDate = new Date();
        const minDate = new Date();
        minDate.setDate(minDate.getDate() - 7);

        const formatDate = (date) => date.toISOString().split("T")[0];

        const minDateStr = formatDate(minDate);
        const maxDateStr = formatDate(maxDate);

        const response = await api.get(
            `https://api.uagro.com.br/api/news/list?searchQuery=${name}&quantity=10&page=0&lang=pt-br`
        );

        if (response.status === 200) {
            setData(response.data);
            setAnimation(false)
        }

    };

    const getQuotes = async (name) => {
        if (!name) {
            setData([]);
            return false;
        }

        const response = await api.get(
            `https://precos.api.datagro.com/cad/?a=busca&pal=${name}&drilldown&lang=pt-br`
        );


        if (response.status === 200) {
            setDataQuote(response.data);
        }
    };


    return (
        <SearchContext.Provider value={{
            name,
            setName,
            setSearch,
            search,
            getQuotes,

            dataQuote,
            get,
            data
        }}>
            {children}
        </SearchContext.Provider>
    );
}