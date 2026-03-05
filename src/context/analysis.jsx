'use client'

import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  const { id,marketId, cultura } = useParams();

    const [data, setData] = useState([])
    const [dataVipAnalysis,setDataVipAnalysis] = useState([])
    const [dataBanner, setDataBanner] = useState([])
    const [analysis, setAnalysis] = useState()
    const [renderingNotices, setRenderingNotices] = useState([]);
    const [animated, setAnimated] = useState(false)


    const addRenderedIds = (items) => {
        setRenderingNotices((prev) =>
            Array.from(new Set([...prev, ...items.map((n) => n.id)]))
        );
    };
    const get = async () => {
        setAnimated(true)
        const response = await api.get(`api/Analysis/list?${marketId ? `marketId=${marketId}` : ''}&quantity=30&lang=pt-br`)
        if (response.status == 200) {
            addRenderedIds(response.data)
            setData(response.data)
        }
        setAnimated(false)

    }
    const getById = async (id) => {
        setAnimated(true)

        const response = await api.get(`api/Analysis/List?${marketId ? `marketId=${marketId}` : ''}&analysisId=${id}&lang=pt-br`)
        if (response.status == 200) {
            setAnalysis(response.data[0])
        }
        setAnimated(false)

    }
    const getBanners = async () => {
        const response = await api.get(`api/Analysis/list?${marketId ? `marketId=${marketId}` : ''}&quantity=40&lang=pt-br&ignoredIds=${renderingNotices.join(",")}`)

        if (response.status === 200) {

            const filtered = response.data.filter(item => !renderingNotices.includes(item.id))

            setDataBanner(filtered)
        }
    }
    const getVipAnalysis = async () => {
        const response = await api.get("api/analysis/list?quantity=6&displayArea=VIP&${marketId ? `marketId=${marketId}` : ''}&sort=1&ignorePinned=true&lang=pt-br")
        if(response.status == 200){
            setDataVipAnalysis(response.data)
        } 
    }

    useEffect(() => {
        getVipAnalysis()
        getById(id)
    }, [id])


    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        if (renderingNotices.length > 0) {
            getBanners();
        }
    }, [renderingNotices]);

    return (
        <AnalysisContext.Provider value={{
            get,
            data,
            getBanners,
            dataBanner,
            analysis,
            animated,
            dataVipAnalysis
        }}>
            {children}
        </AnalysisContext.Provider>
    );
}