'use client'

import React, { useContext, useEffect, useRef, useState } from "react";
import anychart from "anychart";
import { useNavigate } from "react-router-dom";

import { RenderTables } from "./renderTables";
import { PricesContext } from "@/context/prices";
import { QuadrosContext } from "@/context/quadros";

export const MainChart = ({ props = "" }) => {
	const chartRef = useRef(null);
	const navigate = useNavigate();
	const containerRef = useRef(null);
	const { quadrosHome } = useContext(QuadrosContext)
	const { historicalSeries, lastQuote } = useContext(PricesContext)

	const index = {
		name: "Indicador do Boi SP",
		value: 321.12,
		changePct: +1.6,
		prevClose: 322.14,
		open: 322.55,
	};

	const fmtPct = (n) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
	const fmtBRL = (n) =>
		n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
	const color = (n) => (n >= 0 ? "text-[#57b024]" : "text-red-600");
	const bgBadge = (n) =>
		n >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700";

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = anychart.area();

		chart.background().fill("#fff");
		chart.padding(10, 10, 0, 0);
		chart.legend(false);

		chart.yAxis().labels().format(function () {
			const v = this.value;
			return v;
		});

		chart.xAxis().labels().rotation(0);

		// 🔹 monta os dados: data no eixo X, valor no Y
		const data = historicalSeries?.map(p => ({
			x: p.y,
			value: p.x,
		}));

		const s = chart.area(data);
		s.stroke("#16a34a", 2);
		s.fill("#16a34a", 0.18);
		s.hovered().markers(true).type("circle").size(4);

		// const values = historicalSeries?.map(p => Number(p.x));
		// const min = Math.min(...values);
		// const max = Math.max(...values);

		// chart.yScale().minimum(min);
		// chart.yScale().maximum(max);

		// 🔹 cria um scale DateTime separado e configura o gap
		const xScale = anychart.scales.dateTime();
		xScale.minimumGap(0);
		xScale.maximumGap(0);
		chart.xScale(xScale);

		chart.container(containerRef.current);
		chart.draw();

		return () => chart.dispose();
	}, [historicalSeries]);

	return (
		<div
			className={[
				"relative w-full xl:max-w-[1280px] 2xl:max-w-[1650px]  mx-auto ",
				"p-4 pb-12 md:p-6 flex flex-col gap-0 lg:flex-row items-center justify-center",
				props,
			].join(" ")}
		>
			<div className="flex flex-col w-full lg:w-1/3 ">
				<div className="flex items-center flex-wrap gap-3 mb-9">
					<h2 className="text-2xl font-semibold">{lastQuote?.[0]?.name}</h2>
					<div className="text-3xl font-bold tabular-nums">
						{lastQuote?.[0]?.value.toLocaleString("pt-BR")}
					</div>
					<span
						className={[
							"px-2 py-1 rounded-md text-sm font-semibold tabular-nums",
							bgBadge(lastQuote?.[0] ? lastQuote?.[0]?.var : 0.0),
						].join(" ")}
					>
						{fmtPct(lastQuote?.[0] ? lastQuote?.[0]?.var : 0.0)}
					</span>
				</div>


				<div className="mt-3 h-[250px]">
					<div ref={containerRef} className="w-full h-full" />
				</div>

				<div className="mt-2 text-xs text-neutral-500">
					11/11/2025 18:14 • Delay 15 min
				</div>



			</div>
			<div className="flex  flex-wrap p-3 -mx-1 items-center justify-center">
				{Object.values(quadrosHome)?.map((grupo, i) => (
					<div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-1">
						<RenderTables dados={grupo} compact />
					</div>
				))}
			</div>

			<button className=" absolute bottom-0 sm:left-[60%] transform-translate w-44 rounded-full bg-secondary text-white py-3 text-sm font-semibold mt-0 hover:bg-[#7a981f] transition" onClick={() => { navigate("/quotes") }}>
				Ver mais cotações
			</button>
		</div>
	);
};
