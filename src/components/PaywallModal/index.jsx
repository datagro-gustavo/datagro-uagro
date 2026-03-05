'use client'

import { Check } from "lucide-react";
import { useState } from "react";

const plans = [
	{
		id: "digital",
		title: "Valor Digital",
		price: "R$ 29,90/mês",
		subtitle: "Plano anual",
	},
	{
		id: "combo",
		title: "Valor Digital + O Globo Digital",
		price: "R$ 29,90/mês",
		subtitle: "Plano anual",
		badge: "Melhor oferta",
	},
	{
		id: "promo",
		title: "Valor Digital + O Globo Digital",
		price: "R$ 24,90/mês",
		subtitle: "Por 3 meses, após, R$ 59,90/mês",
	},
];

export function PaywallModal({ open = true, onClose, scrolledPaywall, noticeId, slug }) {
	const [selectedPlan, setSelectedPlan] = useState("combo");

	const handleRedirectToPortal = () => {
		// window.open("https://portal.datagro.com/pt/access-plans", "_blank")
		window.open(`https://portal.datagro.com/pt/${noticeId}/${slug}`, '_blank')
	}

	if (!open) return null;

	return (
		<div className={`fixed left-0 right-0 bottom-0 top-72 ${scrolledPaywall ? 'sm:top-px top-px' : 'sm:top-64 top-60'} z-[9999999999] flex items-end justify-center`}>
			{/* camada de fundo: gradiente do transparente para o preto */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

			<div className={`relative w-full  bg-[#303030] rounded-t-2xl shadow-2xl px-10 ${scrolledPaywall ? '' : ''}  transition-all duration-300 ease-in-out `}>
				<div className="border-b flex w-full flex-row justify-center items-center py-4">
					<div className="text-white">
						Já é assinante?{" "}
						<button
							className="text-secondary font-semibold underline"
							onClick={() => {
								window.location.href = "/login";
							}}
						>
							Entre aqui
						</button>
					</div>
				</div>

				<div className="flex flex-col gap-6 items-center h-full justify-center mb-4 mt-6 py-4">
					<div>
						<h2 className="text-xl md:text-4xl text-center font-semibold text-white">
							Conteúdo exclusivo
							<span className="block">
								{" "}
								Assine e aproveite nossa cobertura completa.
							</span>
						</h2>
					</div>

					<div className={`${scrolledPaywall ? '' : 'hidden'} flex flex-col text-white gap-4 text-sm md:text-base`}>
						<span>
							<div className="flex-row flex">
								<Check strokeWidth={5} color={"#8CB024"} />
								<span className="ml-2">Acesso ilimitado a todas as notícias</span>
							</div>
						</span>
						<span>
							<div className="flex-row flex">
								<Check strokeWidth={5} color={"#8CB024"} />
								<span className="ml-2">Acesso ilimitado a todas as notícias</span>
							</div>
						</span>
						<span>
							<div className="flex-row flex">
								<Check strokeWidth={5} color={"#8CB024"} />
								<span className="ml-2">Acesso ilimitado a todas as notícias</span>
							</div>
						</span>
						<span>
							<div className="flex-row flex">
								<Check strokeWidth={5} color={"#8CB024"} />
								<span className="ml-2">Acesso ilimitado a todas as notícias</span>
							</div>
						</span>
					</div>

					{onClose && (
						<button
							onClick={onClose}
							className="ml-4 text-gray-400 hover:text-gray-600"
						>
							✕
						</button>
					)}

					<div className="flex justify-center mt">
						<button onClick={() => handleRedirectToPortal()} className="px-8 py-2.5 transition rounded-md bg-secondary text-white text-sm font-semibold hover:bg-emerald-900 hover:text-white  duration-300 ease-in-out">
							Assine agora
						</button>
					</div>
				</div>

				{/* <div className="flex flex-row gap-4 items-center justify-center">
					<span>tEste</span>
					<span>TEste2</span>
					<span>tEste3</span>

				</div> */}
				{/* <div className="border-t w-full">
					teste
				</div> */}

				{/* <div className="flex flex-col md:items-center md:justify-center gap-3 pt-3 h-[30vh]">
					<div className="flex flex-col gap-1 md:items-center md:justify-center">
						<button className="px-8 py-2.5 rounded-full bg-emerald-800 text-white text-sm font-semibold hover:bg-emerald-900 transition">
							Assine agora
						</button>
						<span className="text-[11px] text-gray-500">
							Cancele quando quiser.
						</span>
					</div>
				</div> */}
			</div>
		</div>
	);
}


// Consultoria
// Conteúdo
// Eventos
// Educação
// Contato