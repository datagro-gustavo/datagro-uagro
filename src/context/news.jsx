'use client'

import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useUrlLanguage } from "../hooks/useUrlLanguage";

import { getMarketids } from '../utils/getMarketids'

export const NewsContext = createContext();

const MAP = { pt: "pt-br", en: "en-us" };

const MARKET_BY_CULTURA = {
  "acucar-e-etanol": 2,
  pecuaria: 5,
  soja: 3,

};

const MAX_ROW_ITEMS = 40;

export function NewsProvider({ children }) {
  const { lang, changeLanguage } = useUrlLanguage();
  const langCode = MAP[lang] || lang || "pt-br";

  const [pageType, setPageType] = useState(null);

  const [culture, setCulture] = useState();
  const [currentMarketId, setCurrentMarketId] = useState();
  const [category, setCategory] = useState(null)
  const [categoryRowSection, setCategoryRowSection] = useState(null)
  const [byCategoryRowSection, setByCategoryRowSection] = useState(null)
  const [tickerNotices, setTickerNotices] = useState([])
  const [marketId,setMarketId] = useState()
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState([]);
  const [statusNotice, setStatusNotice] = useState(200)
  const [mostRead, setMostRead] = useState([]);
  const [rowNotices, setRowNotices] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [byCategoryTem, setByCategoryTem] = useState([]);
  const [tag,setTag] = useState(91)

  const [renderingNotices, setRenderingNotices] = useState([]);

  const [animated, setAnimated] = useState(true);
  const [rowPage, setRowPage] = useState(1);

  const [hasMoreRows, setHasMoreRows] = useState(true);
  const [loadingRows, setLoadingRows] = useState(false);
  const [linkColor, setLinkColor] = useState()
  const [animatedNotices,setAnimatedNotices] = useState(false)
  const [scrolled,setScrolled] = useState(false)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const addRenderedIds = (items) => {
    if (!items || !Array.isArray(items)) return;
    
    setRenderingNotices((prev) =>
      Array.from(new Set([...prev, ...items.map((n) => n.id)]))
    );
  };
  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 15);
    return d.toISOString().split("T")[0];
  };
  const withMarket = (url) => {
    return currentMarketId ? `${url}&marketId=${currentMarketId}` : url;
  };
  const getCategoryByCulture = async (culture, id) => {
    const response = await api.get("api/Markets/list?lang=pt-br")

    if (response.status === 200) {
      const data = response.data.find(item => item.id == culture)

      if (!data) {
        const ids = [5, 5, 5];
        const randomIndex = Math.floor(Math.random() * ids.length);
        const randomId = ids[randomIndex];
        setStatusNotice(400)
        return { id: randomId }
      }
      setStatusNotice(200)
      return data
    }

  }
  const getByCategorySection = (url, marketId) => {
    return currentMarketId ? `${url}&marketId=${currentMarketId}` : url + `&marketId=${marketId}`;
  };


  const resetNews = () => {
    setNotices([]);
    setNotice([]);
    setMostRead([]);
    setRowNotices([]);
    setByCategory([]);
    setRenderingNotices([]);
    setRowPage(1);
    setHasMoreRows(true);
  };

  useEffect(() => {

    const fetchMarket = async () => {
      if (!culture) {
        setCurrentMarketId();
        return;
      }
      const marketId = await getCategoryByCulture(culture);
      setCurrentMarketId(culture);
      setLinkColor({ hoverColor: marketId?.color, color: marketId?.color })

    };

    fetchMarket();
  }, [culture]);
  


  useEffect(() => {
    // tipo de pagina
    if (!pageType) return;

    // se for página de cultura mas ainda não tenho marketId, espero
    if (pageType === "culture" && !currentMarketId) return;
    if (pageType === "news" && !currentMarketId) return;
    // 	  resetNews();

    (async () => {
      const hlIds = await getHighLights();
      const mrIds = await getMostRead(hlIds);
      const cIds = await getByCategory(mrIds)
      const techIds = await getByCategoryTemp([...mrIds, ...hlIds])

      await getByCategoryRowSection()

      setRowPage(1);
      setHasMoreRows(true);

      await getRowNoticesPage(1, [...mrIds, ...hlIds]);
    })();
  }, [pageType, langCode, currentMarketId, categoryRowSection,]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!category) {
          setByCategory([]);
          return;
        }
        const data = await getByCategory();
        if (!mounted) return;

      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, [category, currentMarketId, langCode]);


  // Chamadas API
  const getAll = async (ignored) => {

    let url = `api/News/List?quantity=19&lang=${langCode}`;
    url = withMarket(url);
    const response = await api.get(url);

    if (response.status !== 200) return;

    setNotices(response.data);
    setTickerNotices(response.data)
    addRenderedIds(response.data);
  };

  // notícia pelo href completo (link absoluto)
  const getByHref = async (link) => {
    setAnimated(true);
    const response = await fetch(link);
    if (response.status !== 200) return;
    const data = await response.json();
    setNotice(data);
    setAnimated(false);
  };

  // notícias mais lidas
  const getMostRead = async (ignored = []) => {
    const minDate = getMinDate();
    const idsToIgnore = ignored.length ? ignored : renderingNotices;

    let url = `api/News/list?sort=1&quantity=30&lang=${langCode}&ignoredIds=${idsToIgnore.join(",")}`;
    url = withMarket(url);

    const response = await api.get(url);
    if (response.status !== 200);

    const data = response.data;
  const list = data.slice(0, 6);   // ranking lateral
const card = data.slice(6, 13);  // 7 itens (1 main + 6 resto)
    setMostRead([list, card]);
    addRenderedIds(data);

    return data.map((n) => n.id);
  };

  // destaques (highlights)
  const getHighLights = async () => {
    let url = `api/News/highlights?lang=${langCode}&quantity=7`;
    url = withMarket(url);
    const response = await api.get(url);
    if (response.status !== 200);
    setNotices(response.data);
    addRenderedIds(response.data);

    return response.data.map((n) => n.id);
  };

  const getByCategory = async () => {
    const minDate = getMinDate();
    let url = `api/News/List?quantity=5&sort=2&lang=${langCode}&minDate=${minDate}`;
    url = category ? getByCategorySection(url, category) : withMarket(url);
  
    const response = await api.get(url);
    if (response.status !== 200);

    setByCategory(response.data);
    addRenderedIds(response.data);

    return response.data;
  };

  const getByCategoryTemp = async (ignored = []) => {
    const minDate = getMinDate();
    const idsToIgnore = ignored.length ? ignored : renderingNotices;

    let url = `api/News/List?quantity=70&lang=${langCode}&ignoredIds=${idsToIgnore.join(",")}`;
    const response = await api.get(url);

    if (response.status !== 200);

    setByCategoryTem(response.data);
    addRenderedIds(response.data);

    return response.data;
  };

  const getByCategoryRowSection = async () => {
    const minDate = getMinDate();
    let url = `api/News/List?quantity=5&sort=2&lang=${langCode}&minDate=${minDate}`;
    url = categoryRowSection ? getByCategorySection(url, categoryRowSection) : withMarket(url);
    const response = await api.get(url);

    if (response.status !== 200);
    setByCategoryRowSection(response.data);
    addRenderedIds(response.data);

    return response.data;
  };

  // bloco de notícias em linha (primeira carga)
  const getRowNotices = async (ignored = []) => {
    const minDate = getMinDate();
    const idsToIgnore = ignored.length ? ignored : renderingNotices;

    let url = `api/News/list?sort=1&quantity=30&lang=${langCode}&minDate=${minDate}&ignoredIds=${idsToIgnore.join(
      ","
    )}`;
    url = withMarket(url);

    const response = await api.get(url);
    if (response.status !== 200);

    const data = response.data;
    setRowNotices(data);
    addRenderedIds(data);

    return data.map((n) => n.id);
  };

  // notícias em páginas (scroll infinito)
  const getRowNoticesPage = async (pageToLoad = 1, ignored = []) => {
    const minDate = getMinDate();
    const idsToIgnore = ignored.length ? ignored : renderingNotices;
    
    
    if (pageType == 'home') {
      let url = `api/News/list?sort=1&quantity=8&page=${pageToLoad}&lang=${langCode}&minDate=2025-02-23&ignoredIds=${idsToIgnore.join(
        ","
      )}`;
      url = withMarket(url);

      const response = await api.get(url);
      if (response.status !== 200)
        return { items: [], hasMore: false };

      const data = response.data;
      const items = Array.isArray(data.items) ? data.items : data;

      const previousCount = pageToLoad === 1 ? 0 : rowNotices.length;
      const mergedCount = previousCount + items.length;
      const limitedCount = Math.min(mergedCount, MAX_ROW_ITEMS);

      const hasNextFromApi = data.hasNextPage ?? items.length > 0;
      const willReachLimit = limitedCount >= MAX_ROW_ITEMS;
      const finalHasMore = hasNextFromApi && !willReachLimit;

      setRowNotices((prev) => {
        const merged = pageToLoad === 1 ? items : [...prev, ...items];
        return merged.slice(0, MAX_ROW_ITEMS);
      });

      addRenderedIds(items);
      setRowPage(pageToLoad);
      setHasMoreRows(finalHasMore);

      return { items, hasMore: finalHasMore };
    }

     if (pageType == 'notices' || pageType == "news") {
      setAnimatedNotices(true)
      let url = `api/News/list?sort=1&quantity=8page=${pageToLoad}&lang=${langCode}&minDate=${minDate}&ignoredIds=${idsToIgnore.join(
        ","
      )}`;
      url = withMarket(url);

      const response = await api.get(url);
      if (response.status !== 200)
        return { items: [], hasMore: false };

      const data = response.data;
      const items = Array.isArray(data.items) ? data.items : data;

      const previousCount = pageToLoad === 1 ? 0 : rowNotices.length;
      const mergedCount = previousCount + items.length;
      const limitedCount = Math.min(mergedCount, MAX_ROW_ITEMS);

      const hasNextFromApi = data.hasNextPage ?? items.length > 0;
      const willReachLimit = limitedCount >= MAX_ROW_ITEMS;
      const finalHasMore = hasNextFromApi && !willReachLimit;

      setRowNotices((prev) => {
        const merged = pageToLoad === 1 ? items : [...prev, ...items];
        return merged.slice(0, MAX_ROW_ITEMS);
      });

      addRenderedIds(items);
      setRowPage(pageToLoad);
      setHasMoreRows(finalHasMore);
      setAnimatedNotices(false)
      return { items, hasMore: finalHasMore };
    }
    
     if (pageType == 'tags') {
      const pageLoadTag = 0
    
      setAnimatedNotices(true)
      let url = `api/News/list?&tags=91&sort=1&quantity=8&page=${pageLoadTag}&lang=${langCode}`;
      url = withMarket(url);

      const response = await api.get(url);
      if (response.status !== 200)
        return { items: [], hasMore: false };

      const data = response.data;
      const items = Array.isArray(data.items) ? data.items : data;

      const previousCount = pageLoadTag === 1 ? 0 : rowNotices.length;
      const mergedCount = previousCount + items.length;
      const limitedCount = Math.min(mergedCount, MAX_ROW_ITEMS);

      const hasNextFromApi = data.hasNextPage ?? items.length > 0;
      const willReachLimit = limitedCount >= MAX_ROW_ITEMS;
      const finalHasMore = hasNextFromApi && !willReachLimit;

      setRowNotices((prev) => {
        const merged = pageLoadTag === 1 ? items : [...prev, ...items];
        return merged.slice(0, MAX_ROW_ITEMS);
      });

      addRenderedIds(items);
      setRowPage(pageLoadTag);
      setHasMoreRows(finalHasMore);
      setAnimatedNotices(false)
      return { items, hasMore: finalHasMore };
    }

  };



  // próxima página do infinite scroll
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
  const loadMoreNotices = async () => {
    await getRowNoticesPage(rowPage + 1);

  }

  const getById = async (id) => {
    setAnimated(true);
    const response = await api.get(`api/News/list?newsId=${id}&lang=${langCode}`);
    if (response.status !== 200);

    const data = response.data;

    setNotice(data);
    setAnimated(false);
  };


  useEffect(() => {
    getMostRead()
    getByCategoryRowSection()
    getByCategory()
  }, [])

  const value = {

    culture,
    setCulture,
    currentMarketId,
    pageType,
    setPageType,
    setCategory,
    setCategoryRowSection,
    getById,

    notices,
    notice,
    mostRead,
    rowNotices,
    byCategory,
    byCategoryRowSection,
    categoryRowSection,
    tickerNotices,
    animated,
    hasMoreRows,
    loadingRows,
    getAll,
    getByHref,
    getHighLights,
    getMostRead,
    getByCategory,
    getRowNotices,
    getRowNoticesPage,
    loadMoreRowNotices,
    setMarketId,
    animatedNotices,
    marketId,
    setTag,
    setLinkColor,
    setCurrentMarketId,
    linkColor,
    lang,
    langCode,
    statusNotice,
    byCategoryTem,
    setScrolled,
    scrolled,
    changeLang: changeLanguage,
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}