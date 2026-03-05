'use client'

import React, { createContext, useEffect, useState, useMemo } from "react";
import apiPrecos from "../services/api";
import { useUrlLanguage } from "../hooks/useUrlLanguage";
import { getPriceConfig } from "../utils/getPricesConfig";
import { getFromDate } from "../utils/getFromDate";

export const PricesContext = createContext(null);

const LANGUAGE_MAP = { pt: "pt-br", en: "en-us" };

export const PricesProvider = ({ children }) => {
	const { lang, changeLanguage } = useUrlLanguage();
	const langCode = LANGUAGE_MAP[lang] || lang || "pt-br";

	const [ticker, setTicker] = useState([]);
	const [assets, setAssets] = useState([]);
	const [asset, setAsset] = useState([]);
	const [assetMiniChart, setAssetMiniChart] = useState([]);

	const [historicalSeries, setHistoricalSeries] = useState([]);
	const [historicalSeriesMiniChart, setHistoricalSeriesMiniChart] = useState([]);
	const [lastQuote, setLastQuote] = useState([]);
	const [miniQuotes, setMiniQuotes] = useState([]);
	const [quotes, setQuotes] = useState([]);
	const [selectedQuoteCode, setSelectedQuoteCode] = useState(null);
	const [selectedQuoteHome, setSelectedQuoteHome] = useState("");
	const [selectedQuoteCodeMini, setSelectedQuoteCodeMini] = useState(null);
	const [interval, setInterval] = useState("10D");

	const config = useMemo(() => getPriceConfig("ticker"), []);

	const fetchMiniQuotes = async () => {
		try {
			const assetCodes = ["IBOV", "DOLCM", "BTC"].join(",");
			const response = await fetch(
				`https://precos.api.datagro.com/quadros/?ativos=${assetCodes}&idioma=${langCode}`
			);

			if (!response.ok) return;

			const data = await response.json();

			const mappedQuotes =
				data?.ativos?.map((item) => {
					const replace = {
						"dólar comercial": "DÓLAR",
						"índice bovespa": "IBOVESPA",
						bitcoin: "BITCOIN",
					};

					const originalName = item.dados?.nome || "";
					const normalizedName = replace[originalName?.toLowerCase()] || originalName;

					const numericValue = Number(item.dados?.ult);

					return {
						name: normalizedName || "",
						var: item.dados?.var || 0.0,
						value:
							numericValue.toLocaleString("pt-BR", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							}) || 0.0,
					};
				}) || [];

			setMiniQuotes(mappedQuotes);
		} catch (error) {
			console.error("Error fetching mini quotes:", error);
			setMiniQuotes([]);
		}
	};

	const fetchQuotes = async () => {
		try {
			const assetCodes = ["IBOV", "DOLCM", "BTC"].join(",");
			const response = await fetch(
				`https://precos.api.datagro.com/quadros/?ativos=${assetCodes}&idioma=${langCode}`
			);

			if (!response.ok) return;

			const data = await response.json();

			const mappedQuotes =
				data?.ativos?.map((item) => {
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

			setQuotes(mappedQuotes);
		} catch (error) {
			console.error("Error fetching quotes:", error);
			setQuotes([]);
		}
	};

	const fetchAssets = async (assetsList = assets) => {
		try {
			if (!assetsList || assetsList.length === 0) return;

			const assetCodes = assetsList.map((assetItem) => assetItem.ativo).join(",");

			const response = await fetch(
				`https://precos.api.datagro.com/quadros/?ativos=${assetCodes}&idioma=${langCode}`
			);

			if (!response.ok) return;

			const data = await response.json();

			const mappedTicker =
				data?.ativos?.map((item) => {
					const currentAsset = assetsList.find((assetItem) => {
						const prefix = assetItem.ativo.split(":")[0].split("@")[0];
						return item.cod.startsWith(prefix);
					});

					const decimals = item.dados?.decimais || 2;
					const value = item.dados?.ult || 0.0;
					const varValue = item.dados?.var || 0.0;

					return {
						ativo: item.cod,
						nome: currentAsset?.nome || "",
						valor: value.toLocaleString("pt-BR", {
							minimumFractionDigits: decimals,
							maximumFractionDigits: decimals,
						}),
						var: varValue.toLocaleString("pt-BR", {
							minimumFractionDigits: decimals,
							maximumFractionDigits: decimals,
						}),
					};
				}) || [];

			setTicker(mappedTicker);
		} catch (error) {
			console.error("Error fetching assets:", error);
			setTicker([]);
		}
	};

	const fetchHistoricalSeries = async () => {
		// try {
		// 	const assetCode = selectedQuoteCode ||  "D_PEPR_SP_BR";
		// 	const dateRange = getFromDate(interval);

		// 	const lastResponse = await fetch(
		// 		`https://precos.api.datagro.com/dados/?formato=json&a=${assetCode}&idioma=${langCode}`
		// 	);

		// 	const seriesResponse = await fetch(
		// 		`https://precos.api.datagro.com/dados/?i=${dateRange.i}&f=${dateRange.f}&formato=json&a=${assetCode}&periodo=D`
		// 	);

		// 	if (lastResponse.ok) {
		// 		const lastData = await lastResponse.json();
		// 		setAsset(lastData);
		// 	}

		// 	if (seriesResponse.ok) {
		// 		const seriesData = await seriesResponse.json();

		// 		const values = Object.values(seriesData).map((point) => ({
		// 			x: point.ult,
		// 			y: point.dia,
		// 			var: point.med
		// 		}));

		// 		setHistoricalSeries(values);
		// 	}

		// } catch (error) {
		// 	console.error("Error fetching historical series:", error);
		// 	setAsset([]);
		// 	setHistoricalSeries([]);
		// }
	};

	const fetchHistoricalSeriesMiniChart = async () => {
		try {
			// const assetCode = selectedQuoteCodeMini || "D_PEPR_SP_BR";
			// const dateRange = getFromDate(interval);

			// const lastResponse = await fetch(
			// 	`https://precos.api.datagro.com/dados/?formato=json&a=${assetCode}&idioma=${langCode}`
			// );

			// const seriesResponse = await fetch(
			// 	`https://precos.api.datagro.com/dados/?i=${dateRange.i}&f=${dateRange.f}&formato=json&a=${assetCode}&periodo=D`
			// );

			// if (lastResponse.ok) {
			// 	const lastData = await lastResponse.json();
			// 	setAssetMiniChart(lastData);
			// }

			// if (seriesResponse.ok) {
			// 	const seriesData = await seriesResponse.json();
			// 	const values = Object.values(seriesData).map((point) => ({
			// 		x: point.ult,
			// 		y: point.dia,
			// 		var: point.med
			// 	}));
			// 	setHistoricalSeriesMiniChart(values);
			// }

		} catch (error) {
			console.error("Error fetching historical series:", error);
			setAssetMiniChart([]);
			setHistoricalSeriesMiniChart([]);
		}
	};

	const fetchHistoricalSeriesForCards = async (code, startDate, endDate) => {
		try {
			if (!code || !startDate || !endDate) return [];

			const response = await fetch(
				`https://precos.api.datagro.com/dados/?i=${startDate}&f=${endDate}&formato=json&a=${code}&periodo=D&bolsa=2`
			);

			if (!response.ok) return [];

			const seriesData = await response.json();

			const values = Object.values(seriesData).map((point) => ({
				x: point.ult,
				y: point.dia,
			}));

			return values;
		} catch (error) {
			console.error("Error fetching historical series for cards:", error);
			return [];
		}
	};

	const fetchLastQuote = async () => {
		try {
			const assetCode = selectedQuoteCode || "D_PEPR_SP_BR";

			const response = await fetch(
				`https://precos.api.datagro.com/dados/?formato=json&a=${assetCode}&idioma=${langCode}`
			);

			if (!response.ok) {
				setLastQuote([]);
				return;
			}

			const data = await response.json();
			const lastData =
				(Array.isArray(data) ? data : Object.values(data)).map((item) => {
					const decimals = item?.decimais || 2;
					const numericValue = parseFloat(item?.ult ?? "0");
					setInterval(item?.chart1)
					return {
						code: item?.cod ?? "",
						name: item?.nome ?? "",
						value: numericValue.toLocaleString("pt-BR", {
							minimumFractionDigits: decimals,
							maximumFractionDigits: decimals,
						}),
						long: item?.longo ?? "",
						var: parseFloat(item?.var ?? "0"),
						date: item?.dia ?? "",
						hour: item?.hora ?? "",
						font: item?.feed ?? ""
					};
				});


			setLastQuote(lastData);

		} catch (error) {
			setLastQuote([]);
		}
	};

	useEffect(() => {
		// fetchLastQuote();
	}, [langCode, selectedQuoteCode]);

	useEffect(() => {
		// fetchHistoricalSeries();
	}, [langCode, selectedQuoteCode, interval]);

	useEffect(() => {
		try {
			if (Array.isArray(config?.ativos)) {
				const list = config.ativos.map((item) => ({
					ativo: item.ativo,
					nome: item.nome[langCode],
				}));
				setAssets(list);
			}
		} catch (error) {
			console.error("Error processing config assets:", error);
			setAssets([]);
		}
	}, [config, langCode]);

	useEffect(() => {
		if (!assets.length) return;
		fetchAssets(assets);
	}, [assets, langCode]);

	useEffect(() => {
		fetchMiniQuotes();
	}, [langCode]);

	useEffect(() => {
		fetchQuotes();
	}, [langCode]);

	useEffect(() => {
		fetchHistoricalSeriesMiniChart();
	}, [langCode, selectedQuoteCodeMini, interval]);

	const value = {
		ticker,
		historicalSeries,
		historicalSeriesMiniChart,
		assetMiniChart,
		selectedQuoteCodeMini,
		setSelectedQuoteCodeMini,

		lastQuote,
		setSelectedQuoteCode,
		quotes,
		fetchHistoricalSeriesForCards,
		fetchHistoricalSeries,
		interval,
		miniQuotes,
		setInterval,
		lang,
		langCode,
		changeLang: changeLanguage,
		asset,
		assets,
	};

	return (
		<PricesContext.Provider value={value}>
			{children}
		</PricesContext.Provider>
	);
};
