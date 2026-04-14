'use client'

import { createContext, useEffect, useState } from "react";
import api from "@/services/api";

export const TagsContext = createContext();

export function TagsProvider({ children }) {

    const [data, setData] = useState()

    const [renderingNotices, setRenderingNotices] = useState([]);
    const [rowNotices, setRowNotices] = useState([]);
    const [rowPage, setRowPage] = useState(1);
    const [hasMoreRows, setHasMoreRows] = useState(true);
    const [animatedNotices, setAnimatedNotices] = useState(false);
    const [tagId, setTagId] = useState(null)
    const [tagName, setTagName] = useState(null)
    const [tag, setTag] = useState()
    const [nameTag, setNameTag] = useState()
    const [loadingRows, setLoadingRows] = useState(false);
    const [tagSlug, setTagSlug] = useState(null)

    const MAX_ROW_ITEMS = 40;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


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

    const getTagIdBySlug = async (slug) => {
        try {
            const response = await api.get(`api/tags?slug=${slug}`);
            if (response.data) {


                setTagName(response.data[0].name);
                setNameTag(response.data[0].name);
                setTagId(response.data[0].id);


            }
        } catch (error) {
            console.error("Error fetching tag ID:", error);
        }
        return null;
    };

    const getRowNoticesPage = async (pageToLoad = 0, ignored = []) => {
        try {
            const idsToIgnore = ignored.length ? ignored : renderingNotices;

            setAnimatedNotices(true);


            let url = `api/News/list?tags=${tagId}&quantity=8&page=${pageToLoad}&lang=pt-br&ignoredIds=${idsToIgnore}`;

            const response = await api.get(url);

            if (response.status !== 200) {
                setAnimatedNotices(false);
                return { items: [], hasMore: false };
            }

            setData(tagName)

            const data = response.data;
            const items = Array.isArray(data.items) ? data.items : data;

            const previousCount = pageToLoad === 0 ? 0 : rowNotices.length;
            const mergedCount = previousCount + items.length;
            const limitedCount = Math.min(mergedCount, MAX_ROW_ITEMS);

            const hasNextFromApi = data.hasNextPage ?? items.length > 0;
            const willReachLimit = limitedCount >= MAX_ROW_ITEMS;
            const finalHasMore = hasNextFromApi && !willReachLimit;

            setRowNotices((prev) => {
                const merged = pageToLoad === 0 ? items : [...prev, ...items];
                return merged.slice(0, MAX_ROW_ITEMS);
            });

            addRenderedIds(items);
            setRowPage(pageToLoad);
            setHasMoreRows(finalHasMore);

            setAnimatedNotices(false);

            return { items, hasMore: finalHasMore };

        } catch (error) {
            setAnimatedNotices(false);
            console.error(error);
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

    useEffect(() => {
        if (tagId) {
            getRowNoticesPage()
        }
    }, [tagId])

    useEffect(() => {
        if (tagSlug) {
            getTagIdBySlug(tagSlug);
        }
    }, [tagSlug])

    return (
        <TagsContext.Provider
            value={{
                rowNotices,
                rowPage,
                hasMoreRows,
                animatedNotices,
                getRowNoticesPage,
                setTag,
                tag,
                loadMoreRowNotices,
                setLoadingRows,
                loadingRows,
                data,
                setTagId,
                setTagSlug,
                nameTag


            }}
        >
            {children}
        </TagsContext.Provider>
    );
}