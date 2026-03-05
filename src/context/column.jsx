'use client'

import React, { createContext, useEffect, useState } from 'react'
import api from '../services/api';
// import { useUrlLanguage } from '../hooks/useUrlLanguage';

export const ColumnContext = createContext();
const MAP = { pt: "pt-br", en: "en-us" };

export const ColumnProvider = ({ children }) => {

    const [columnist, setColumnist] = useState([]);
    const [columnistName, setColumnistName] = useState()
    const [columnistArticles, setColumnistArticles] = useState()

    const [columnistImage, setColumnistImage] = useState()
    const [columnistMiniBio, setColumnistMiniBio] = useState()
    const [columnistHistory, setColumnistHistory] = useState()
    const [columnistHistorySection, setColumnistHistorySection] = useState()
    const [columnistId, setColumnistId] = useState(null)
    const [renderedIds, setRenderedIds] = useState([]);
    const [animated, setAnimated] = useState(false)
    const [animatedColumnist, setAnimatedColumnist] = useState(false)
    const [lang] = useState()
    // const { lang, changeLanguage } = useUrlLanguage();
    const langCode = MAP[lang] || lang || "pt-br";

    const addRenderedIds = (items) => {
        if (!items || !Array.isArray(items)) return;
        
        setRenderedIds(prev => {
            const updated = Array.from(new Set([...prev, ...items.map(i => i.id)]));
            return updated;
        });


    };

    const getColumnistById = async (id) => {

        const response = await api.get(`api/columnist/?colunistid=${id}&lang=${langCode}`);
        if (response.status === 200) {
            const r = response.data;

            // const formatted = r?.map((item) => ({
            //     name: item.name,
            //     title: item.lastNews?.[0]?.title,
            //     url: item.lastNews?.[0]?.url,
            //     id: item?.id,
            //     image: item?.imageUrl,
            //     minibio: item?.minibio
            // }));   
            setColumnist(response.data);
        }
        return null;
    };

    const getColumnist = async () => {
        setAnimatedColumnist(true)
        const response = await api.get(`api/Columnist/List?lang=${langCode}&quantity=10&includeLastNews=1`);
        if (response.status === 200) {
            const r = response.data;

            const formatted = r?.map((item) => ({
                name: item.name,
                title: item.lastNews?.[0]?.title,
                url: item.lastNews?.[0]?.url,
                columnistId: item?.id,
                id: item.lastNews?.[0]?.id,
                image: item?.imageUrl,
                minibio: item?.minibio
            }));

            setColumnistArticles(formatted);
            setAnimatedColumnist(false)
        }
    };

    const getColumnistHistory = async () => {
        setAnimated(true)
        const response = await api.get(`api/news/list?searchQuery=&columnistId=${columnistId}&quantity=20&page=0&lang=${langCode}`);
        addRenderedIds(response.data);

        if (response.status === 200) {
            const formatted = response.data?.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                category: item?.markets?.[0]?.title,
                url: item.url
            }));

            setColumnistHistory(formatted)
            setAnimated(false)
        }

        return [];
    };

    const getColumnistHistorySection = async (id) => {
        const ignored = renderedIds.join(",");
        const response = await api.get(`api/news/list?searchQuery=&columnistId=${id}&&quantity=20&page=0&lang=${langCode}&ignoredIds=${ignored}`)
        if (response.status === 200) {

            const formatted = response.data?.map((item) => ({
                id: item.id,
                title: item.title,
                columnistId: item.columnistId,
                description: item.description,
                imageUrl: item.imageUrl,
                category: item?.markets?.[0]?.title,
                url: item.url
            }))


            setColumnistHistorySection(formatted)
        }
    }


    useEffect(() => {
        (async () => {
            await getColumnist();

            await getColumnistHistory();
            await getColumnistHistorySection();
        })();
    }, [langCode, columnistId]);

    const values = {
        columnist,
        setAnimated,
        setColumnistName,
        getColumnistById,
        columnistName,
        columnistArticles,
        setColumnistImage,
        columnistImage,
        setColumnistMiniBio,
        columnistMiniBio,
        setColumnistId,
        getColumnistHistorySection,
        columnistId,
        setColumnistHistory,
        columnistHistory,
        animated,
        columnistHistorySection,
        setAnimatedColumnist,
        animatedColumnist
    }

    return (
        <ColumnContext.Provider value={values}>
            {children}
        </ColumnContext.Provider>
    )
}
