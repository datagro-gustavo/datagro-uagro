'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useUrlLanguage } from '../hooks/useUrlLanguage';
import { getQuadrosConfig } from '../utils/getQuadrosConfig';

export const QuadrosContext = createContext();
const MAP = { pt: "pt-br", en: "en-us" };
const PRIORITY_ID = "96";

export const QuadrosProvider = ({ children }) => {
	const { lang, changeLanguage } = useUrlLanguage();
	const langCode = MAP[lang] || lang || "pt-br";
	const [listQuadrosIds, setListQuadrosIds] = useState([]);
	const [quadroId, setQuadroId] = useState(PRIORITY_ID);
	const [quadroData, setQuadroData] = useState([]);

	const quadrosH = useMemo(() => getQuadrosConfig('quadrosHome'), []);
	const quadrosIntegraConfig = useMemo(() => getQuadrosConfig('quadrosIntegra'), []);

	const first = quadrosH?.idb;
	const [quadrosHome, setQuadrosHome] = useState({})
	const [quadrosIntegra, setQuadrosIntegra] = useState({})

	const [selectIds] = useState(() => {
		const aleatorios = quadrosH.ids.sort(() => Math.random() - 0.5);
		const escolhidos = aleatorios.slice(0, 9);
		return [quadrosH?.idb, ...escolhidos]
	})
	const [selectIdsIntegra] = useState(() => {
		const aleatorios = quadrosH.ids.sort(() => Math.random() - 0.5);
		const escolhidos = aleatorios.slice(0, 9);

		return [quadrosIntegraConfig?.idb, ...escolhidos]
	})
	const getQuadrosHome = async () => {
		const response = await fetch(
			`https://precos.api.datagro.com/paginas/?mercado=0&minihome=&pos=1&idioma=${langCode}`
		);

		if (response.status === 200) {
			const precos = await response.json();

			const quadrosHome = (precos.quadros || []).map((quadro) => ({
				id: quadro.id,
				titulo: quadro.titulo,
				ativos: (quadro.ativos || []).map((ativo) => ({
					nome: ativo?.dados?.nome,
					preco: ativo?.dados?.ult ?? 0.0,
					var: ativo?.dados?.var ?? 0.0,
					cod: ativo?.dados?.cod ?? ""
				})),
			}));

			console.log("===========")
			console.log(quadrosHome)

			
			const selecionados = quadrosHome?.filter((quadro) => {
				const ok = selectIds.includes(parseInt(quadro.id));
				return ok;
			}).sort((a, b) => {
				if (parseInt(a.id) === first) return -1;
				if (parseInt(b.id) === first) return 1;
				return 0;
			});

			setQuadrosHome(selecionados)
		}
	};

	const getQuadrosIntegra = async () => {
		const response = await fetch(
			`https://precos.api.datagro.com/paginas/?mercado=0&minihome=&pos=1&idioma=${langCode}`
		);

		if (response.status === 200) {
			const precos = await response.json();

			const quadrosIntegra = (precos.quadros || []).map((quadro) => ({
				id: quadro.id,
				titulo: quadro.titulo,
				ativos: (quadro.ativos || []).map((ativo) => ({
					nome: ativo?.dados?.nome,
					preco: ativo?.dados?.ult ?? 0.0,
					var: ativo?.dados?.var ?? 0.0,
					cod: ativo?.dados?.cod ?? ""
				})),
			}));

			const selecionados = quadrosIntegra?.filter((quadro) => {
				const ok = selectIdsIntegra.includes(parseInt(quadro.id));
				return ok;
			}).sort((a, b) => {
				if (parseInt(a.id) === first) return -1;
				if (parseInt(b.id) === first) return 1;
				return 0;
			});

			setQuadrosIntegra(selecionados)
		}
	}

	const getListQuadrosIds = async () => {
		const response = await fetch(
			`https://precos.api.datagro.com/quadros/lista/?idioma=${langCode}`
		);

		if (response.status === 200) {
			const precos = await response.json();
			setListQuadrosIds(precos.quadros);
		}
	};

	const getQuadros = async () => {
		const response = await fetch(
			`https://precos.api.datagro.com/quadros?quadro=${quadroId}&idioma=${langCode}`
		);

		if (response.status === 200) {
			const precos = await response.json();

			const mappedQuotes =
				precos?.ativos?.map((item) => {
					const replace = {
						"dólar comercial": "DÓLAR",
						"índice bovespa": "IBOVESPA",
						bitcoin: "BITCOIN",
					};

					const originalName = item.dados?.nome || "";
					const normalizedName = replace[originalName?.toLowerCase()] || originalName;

					const numericValue = Number(item.dados?.ult);
					const date = item.dados?.dia || "";
					const code = item.cod || "";
					const longName = item.dados?.longo || "";
					const max = Number(item.dados?.maxi) || 0.0;
					const min = Number(item.dados?.mini) || 0.0;
					const decimals = item.dados?.decimais || 2;

					return {
						name: normalizedName || "",
						var: item.dados?.var || 0.0,
						value:
							numericValue.toLocaleString("pt-BR", {
								minimumFractionDigits: decimals,
								maximumFractionDigits: decimals,
							}) || 0.0,
						date,
						cod: code,
						long: longName,
						max: max.toLocaleString("pt-BR", {
							minimumFractionDigits: decimals,
							maximumFractionDigits: decimals,
						}),
						min: min.toLocaleString("pt-BR", {
							minimumFractionDigits: decimals,
							maximumFractionDigits: decimals,
						}),
						hour: item.dados?.hora || ""
					};
				}) || [];


			setQuadroData(mappedQuotes);
		}
	}


	useEffect(() => {
		getQuadros()
	}, [quadroId, langCode])

	useEffect(() => {
		getListQuadrosIds()
	}, [langCode])

	useEffect(() => {
		getQuadrosHome()
	}, [langCode])

	useEffect(() => {
		getQuadrosIntegra()
	}, [langCode])

	const value = {
		quadrosHome,
		quadrosIntegra,
		listQuadrosIds,
		setQuadroId,
		quadroData,
		lang,
		langCode,
		changeLang: changeLanguage,
	};

	return (
		<QuadrosContext.Provider value={value}>
			{children}
		</QuadrosContext.Provider>
	);
}
