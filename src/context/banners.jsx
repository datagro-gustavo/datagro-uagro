'use client'

import { createContext, useState, useCallback } from "react";
import api from "@/services/api";

export const BannersContext = createContext();

const bannersConfig = {
    1: {
        id: 1,
        name: "Banner Principal (Topo)",
        location: "Logo abaixo dos tickers",
        objective: "Alta visibilidade para campanhas principais",
        recommendedSizes: {
            site: { width: 1600, minHeight: 200, maxHeight: 400 },
            mobile: { width: 800, minHeight: 200, maxHeight: 400 },
        },
        quantity: 3,
        rotative: false,
    },
    2: {
        id: 2,
        name: "Banner Secundário",
        location: 'Abaixo da seção "Mais Lidas"',
        objective: "Campanhas de prazo mais longo",
        recommendedSizes: {
            site: { width: 1200, minHeight: 200, maxHeight: 400 },
            mobile: { width: 800, minHeight: 200, maxHeight: 400 },
        },
        quantity: 3,
        rotative: false,
    },
    3: {
        id: 3,
        name: "Selo Lateral",
        location: "Barra lateral, à direita",
        positionNote: "Abaixo do formulário de newsletter e abaixo do quadro de indicadores",
        objective: "Banner lateral",
        observation: "Pode conter mais de um banner rotativo",
        recommendedSizes: {
            site: { width: 400, height: 400 },
            mobile: { width: 800, height: 200 },
        },
        quantity: 5,
        rotative: true,
    },
    4: {
        id: 4,
        name: "Banner Dinâmico (entre notícias)",
        location: 'Dentro da listagem de notícias ("Mais Notícias")',
        rule: "1 banner a cada 2 faixas de notícias",
        objective: "Inserção dinâmica no feed",
        recommendedSizes: {
            site: { width: 1600, heights: [200, 300, 400] },
            mobile: { width: 800, heights: [200, 300] },
        },
        quantity: 10,
        rotative: true,
    },
    5: {
        id: 5,
        name: "Editoria",
        location: "Página da Editoria",
        objective: "Determinado público-alvo",
        recommendedSizes: {
            site: { width: 1200, minHeight: 200, maxHeight: 400 },
            mobile: { width: 800, minHeight: 200, maxHeight: 400 },
        },
        quantity: 3,
        rotative: false,
    },
    6: {
        id: 6,
        name: "Selo Lateral da Editoria",
        location: "Barra lateral, à direita, na página da Editoria",
        objective: "Determinado público-alvo",
        observation: "Pode conter mais de um banner rotativo",
        recommendedSizes: {
            site: { width: 400, height: 400 },
            mobile: { width: 800, height: 200 },
        },
        quantity: 5,
        rotative: true,
    },
    7: {
        id: 7,
        name: "Assunto",
        location: "Página do Assunto",
        objective: "Determinado público-alvo",
        recommendedSizes: {
            site: { width: 1200, minHeight: 200, maxHeight: 400 },
            mobile: { width: 800, minHeight: 200, maxHeight: 400 },
        },
        quantity: 3,
        rotative: false,
    },
    8: {
        id: 8,
        name: "Selo Lateral do Assunto",
        location: "Barra lateral, à direita, na página do Assunto",
        objective: "Determinado público-alvo",
        observation: "Pode conter mais de um banner rotativo",
        recommendedSizes: {
            site: { width: 400, height: 400 },
            mobile: { width: 800, height: 200 },
        },
        quantity: 5,
        rotative: true,
    },
};

const normalizeValue = (value) => {
    return String(value || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
};

const buildBannerKey = (position, filterType, filterValue) => {
    if (!filterType || !filterValue) return `${position}`;
    return `${position}__${filterType}__${normalizeValue(filterValue)}`;
};

export function BannersProvider({ children }) {
    const [lang, setLang] = useState("pt-br");
    const [banners, setBanners] = useState({});

    const get = useCallback(async (position, filterType, filterValue) => {
        const config = bannersConfig[position];
        const bannerKey = buildBannerKey(position, filterType, filterValue);

        setBanners((prev) => ({
            ...prev,
            [bannerKey]: [],
        }));

        try {
            let url = `/api/Banner/List?position=${position}&quantity=${config.quantity}&lang=${lang}`;

            if (filterType && filterValue) {
                url += `&${filterType}=${encodeURIComponent(filterValue)}`;
            }

            const response = await api.get(url);
            const bannersData = Array.isArray(response?.data) ? response.data : [];

            setBanners((prev) => ({
                ...prev,
                [bannerKey]: bannersData,
            }));

            return bannersData;
        } catch (error) {
            setBanners((prev) => ({
                ...prev,
                [bannerKey]: [],
            }));

            return [];
        }
    }, [lang]);

    const getBannerPositionInfo = (position, filterType, filterValue) => {
        const bannerKey = buildBannerKey(position, filterType, filterValue);

        return {
            ...bannersConfig[position],
            banners: banners[bannerKey] || [],
        };
    };

    return (
        <BannersContext.Provider
            value={{
                lang,
                setLang,
                bannersConfig,
                banners,
                get,
                getBannerPositionInfo,
            }}
        >
            {children}
        </BannersContext.Provider>
    );
}   