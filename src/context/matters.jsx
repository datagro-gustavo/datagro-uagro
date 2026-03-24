'use client'

import { createContext, use, useEffect, useState } from "react";
import api from "@/services/api";

export const MattersContext = createContext();

export function MattersProvider({ children }) {

    const [data, setData] = useState()

    const [renderingNotices, setRenderingNotices] = useState([]);
    const [rowNotices, setRowNotices] = useState([]);
    const [rowPage, setRowPage] = useState(1);
    const [hasMoreRows, setHasMoreRows] = useState(true);
    const [animatedNotices, setAnimatedNotices] = useState(false);
    const [matters, setMatters] = useState([])
    const [matter, setMatter] = useState()
    const [loadingRows, setLoadingRows] = useState(false);
    const [loadMatters, setLoadMatters] = useState(false)
    const langCode = "pt-br";

    const MAX_ROW_ITEMS = 40;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const getMatters = async () => {
        try {
            setLoadMatters(true);
            const response = await api.get(`api/matters/list?lang=${langCode}`);
            if (response.status === 200 && response.data) {
                setMatters(response.data);
                setLoadMatters(false);
            }
        } catch (error) {
            console.error("Error fetching matters:", error);
        }
    };


    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() - 15);
        return d.toISOString().split("T")[0];
    };

    const addRenderedIds = (items) => {
        if (!items || !Array.isArray(items)) return;

        setRenderingNotices((prev) =>
            Array.from(new Set([...prev, ...items.map((n) => n.id)]))
        );
    };

    const getRowNoticesPage = async (pageToLoad = 1, ignored = []) => {
        try {
            const idsToIgnore = ignored.length ? ignored : renderingNotices;
            const ignoredParam = idsToIgnore.length ? `&ignoredIds=${idsToIgnore.join(",")}` : "";

            setAnimatedNotices(true);

            const url = `api/News/list?matters=${matter}&quantity=8&page=${pageToLoad}&lang=pt-br${ignoredParam}`;
            const response = await api.get(url);

            if (response.status !== 200) {
                setAnimatedNotices(false);
                return { items: [], hasMore: false };
            }

            const data = response.data;
            const items = Array.isArray(data.items) ? data.items : data;

            setRowNotices((prev) => (pageToLoad === 1 ? items : [...prev, ...items]).slice(0, MAX_ROW_ITEMS));

            addRenderedIds(items);
            setRowPage(pageToLoad);

            const hasNextFromApi = data.hasNextPage ?? items.length > 0;
            const finalHasMore = hasNextFromApi && (pageToLoad * 8) < MAX_ROW_ITEMS;
            setHasMoreRows(finalHasMore);

            setAnimatedNotices(false);
            return { items, hasMore: finalHasMore };
        } catch (e) {
            setAnimatedNotices(false);
            return { items: [], hasMore: false };
        }
    };

    const loadMoreRowNotices = async () => {
        if (!hasMoreRows || loadingRows) return;

        setLoadingRows(true);
        try {
            await sleep(1000);
            await getRowNoticesPage(rowPage + 1);

        } finally {
            setLoadingRows(false);
        }
    };
    

    const resetRow = () => {
        setRowNotices([]);
        setRenderingNotices([]);
        setRowPage(1);
        setHasMoreRows(true);
    };

    useEffect(() => {
        if (!matter) return;
        resetRow();
        getRowNoticesPage(1, []);
    }, [matter]);

    useEffect(() => {
        getMatters();
    }, [])

    return (
        <MattersContext.Provider
            value={{
                rowNotices,
                rowPage,
                hasMoreRows,
                animatedNotices,
                getRowNoticesPage,
                setMatter,
                matter,
                loadMoreRowNotices,
                setLoadingRows,
                loadingRows,
                matters,
                loadMatters,
                data,
                getMatters
            }}
        >
            {children}
        </MattersContext.Provider>
    );
}