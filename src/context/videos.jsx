'use client'

import React, { createContext, useEffect, useState } from 'react'
import { useUrlLanguage } from '../hooks/useUrlLanguage';
import api from '../services/api';

export const VideosContext = createContext()
const MAP = { pt: "pt-br", en: "en-us" };

export const VideosProvider = ({ children }) => {
    const { lang, changeLanguage } = useUrlLanguage();
    const langCode = MAP[lang] || lang || "pt-br";

    const [videos, setVideos] = useState([])

    const getVideos = async () => {
        let url = `api/Video/List?quantity=20&lang=${langCode}`;

        const response = await api.get(url)

        if (response.status === 200 || response.status === 304) {
            setVideos(response.data)
        }
    }

    useEffect(() => {
        (async () => { await getVideos() })();
    }, [langCode])
    const value = {
        videos,
        changeLanguage
    }


    return (
        <VideosContext.Provider value={value}>
            {children}
        </VideosContext.Provider>
    )
}
