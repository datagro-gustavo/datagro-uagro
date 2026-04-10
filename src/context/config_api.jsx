'use client'

import { configureApi } from "@/services/api";
import { configureApiPrecos } from "@/services/api_precos";

import { createContext, useEffect, useState } from "react"

export const ConfigContext = createContext();

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState({});
    const URL = "https://devx.datagro.com/uagro/";
    const [loading, setLoading] = useState(false);
   

    const get = async () => {

        const response = await fetch(`${URL}config.json`);

        setLoading(true);

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        setConfig(data);

        const linkNoticiasApi = data?.urls?.find((url) => url.type === "noticias")?.link;

        

        configureApi(linkNoticiasApi);

        const linkPrecosApi = data?.urls?.find((url) => url.type === "precos")?.link;
        configureApiPrecos(linkPrecosApi);
        setLoading(false);
    }

    useEffect(() => {
        // get();
    }, []);

    const value = {
        config,
        loading,
    }

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    );
}