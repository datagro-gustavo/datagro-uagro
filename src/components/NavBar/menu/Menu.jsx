'use client'

import React, { useContext, useRef, useState } from 'react'


/* UTILS */

/* CONTEXTS */
import { getEditoriasConfig } from '@/utils/getEditoriasConfig';
import { SearchBox } from '@/components/SearchBox';
import { ThemeContext } from '@/context/theme';
import { useBreakpoint } from '../utils/BreakPoints';
import { MattersContext } from '@/context/matters';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';


export const Menu = ({ props, scrolled }) => {
	const [id, setId] = useState()
	const router = useRouter()
	const { setTheme, theme } = useContext(ThemeContext)
	const {matters, loadMatters} = useContext(MattersContext)
	const editorias = getEditoriasConfig();
	const breakPoint = useBreakpoint()
	const data = false;


	const navItems = editorias.editorias.map((item, idx) => {
		return {
			id: idx,
			label: item.label,
			link: item.link,
			subcategorias: item.subcategorias

		}
	})
	// const navItems = [
	//   { id: 1, label: 'Últimas notícias', link: '/news' },
	//   { id: 2, label: 'Cotações & Análises', link: 'about' },
	//   { id: 3, label: 'Indicadores & Fundamentos', link: 'gallery' },
	//   { id: 4, label: 'Relações Internacionais', link: 'programation' },
	//   { id: 5, label: 'Clima', link: 'https://beefweek.com' },
	//   { id: 6, label: 'AgroTech', link: 'contact' },
	//   { id: 7, label: 'Opinião', link: 'contact' },
	//   { id: 8, label: 'Multimídia', link: 'contact' },gi
	// ];

	const itensVisiveis = {
		'base': 3,
		'sm': 3,
		'md': 4,
	}
	const dataEl = [
		{
			name: "Todas"
		},
		{
			name: "Algodão"
		},
		{
			name: "Açucar e Etanol"
		},
		{
			name: "Biodiesel"
		},
		{
			name: "Borracha"
		}
	]


	const handleRedirectToCulturePage = (item) => {
		router.push(`/editoria/${item.Id}/${item.Name.toLowerCase()}`)
	}


	if (loadMatters) {
		return (
			<Skeleton count={1} width={'100%'}  height={20}  className='mb-4' />
		)
	}

	return (
		<div className={`relative ${props} mt-6 z-9999999`}>
			<nav className='hidden md:flex justify-center gap-7 items-center py-1'>
				<SearchBox />
				<div className="relative hidden md:flex justify-center gap-5 items-center py-0">

					{matters.slice(0,7).map((item) => (

						<div key={item.id}
							style={{
								height: "39px",
								padding: "0.4rem",
							}}
							onMouseEnter={() => setId(item?.id)}
							onMouseLeave={() => setId()}
							className="group relative">

							<span
								onClick={() => handleRedirectToCulturePage(item)}
								className="
								font-metropolis cursor-pointer text-black hover:text-[#139d4a] 
								transition-all duration-300 ease-in-out 
								text-xs md:text-xs lg:text-[13px] xl:text-[13px]"
							>
								{item.Name}
							</span>

							{/* <div
								className="absolute overflow-y-auto max-h-[420px]   shadow-md  border-l border-r  border-b  border-[#b4b4b4ce]  top-full left-[-1px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out bg-[#ffffff] shadow-lg mt-0 w-[319px] z-50  h-[auto]">
								<div className='' />
								<ul className='mt-0 pl-0 '>
									{item.subcategorias?.map((item, index) => {
										return (
											<li
											onClick={() => handleRedirectToCulturePage(item)}
												style={{ borderBottom: item?.name == "Todas" ? "1px solid #b4b4b4ce" : "" }}
												key={item.id}
												className="
											cursor-pointer 
											font-metropolis
											text-[14px]
											text-[#303030]
											pt-3
											h-[40px]
											hover:bg-[#f0efef4e] 
											hover:border-l-4 
											hover:text-[#98BF0E]
											hover:border-1 border-[#98BF0E]
											px-3"
											>
												{item?.name}
											</li>
										);
									})}
								</ul>
							</div> */}
						</div>
					))}
				</div>
		
			</nav>


		</div>
	)
}
