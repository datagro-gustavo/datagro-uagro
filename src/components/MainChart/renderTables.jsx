'use client'

import React, { useContext } from "react";
import datagro from "../../assets/logos/logo-datagro.png";
import { PricesContext } from "@/context/prices";
import Image from "next/image";


export const RenderTables = ({ dados = [], compact = false, miniHome = false }) => {
	//const navigate = useNavigate();
	const { setSelectedQuoteCode, lastQuote  } = useContext(PricesContext)
	
	const fmtPct = (n) => `${n >= 0 ? "+" : ""}${Number(n).toFixed(2)}%`;
	const fmtBRL = (n) =>
		Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
	const color = (n) => (n >= 0 ? "text-[#149749]" : "text-red-600");

	// utilitários para compactar
	const titleMb = compact ? "mb-1" : "mb-2";
	const liPad = compact ? "px-2 py-1.5" : "px-3 py-2";
	const listRad = compact ? "rounded-md" : "rounded-lg";
	const btnMt = compact ? "mt-3" : "mt-6";

	const hrefQuote = (cod) => {
		if (miniHome) {
			setSelectedQuoteCode(cod);
		} else {
	//		navigate(`/quote/${cod}`);
		}
		
	};

	return (
		<div className="rounded-md overflow-hidden w-full py-7">
			<div className="bg-gray-300/30 px-2.5 py-2 border-b border-border">
				<h3 className="font-bold text-[#149749] text-xs break-words">{dados.titulo}</h3>
			</div>
			<div className="divide-y divide-border max-h-[260px] overflow-y-auto">
				{dados?.ativos?.map((a, i) => (
					<div key={i} className="px-2.5 py-2 flex items-center justify-between gap-2">
						<div className="min-w-0 flex-1">
							<button
								onClick={() => { window.open(`https://portal.datagro.com/pt/commodities/DTGR-2/${a.cod}`) }}
								className="text-black text-xs hover:underline text-left break-words w-full cursor-pointer"
								title={a.nome}
							>
								{a.nome}
							</button>
						</div>
						<div className="flex items-center gap-3 shrink-0">
							{"var" in a && (
								<span className={`text-xs font-semibold whitespace-nowrap ${color(a.var)}`}>
									{fmtPct(a.var)}
								</span>
							)}
							{"preco" in a && (
								<span className="text-sm tabular-nums whitespace-nowrap">{fmtBRL(a.preco)}</span>
							)}
						</div>
					</div>
				))}

			<div className="flex justify-end py-3 items-center gap-2">
				<span className="text-sm leading-none relative top-[1px]">Por</span>
				<Image
					src={datagro}
					alt="DATAGRO"
					width={160}
					height={44}
					className="w-30 cursor-pointer"
					priority
					onClick={() => window.open("https://portal.datagro.com", "_blank")}
				/>
				</div>
				</div>
		</div>
	);
};
