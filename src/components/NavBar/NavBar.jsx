'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";

import Image from 'next/image';

import Logo from '../../assets/logos/logo-uagro.png';

import { SidebarContext } from '@/context/sidebar';
import { ModalContext } from '@/context/modal';
import { SearchContext } from '@/context/search';
import { Precos } from './tickers/Precos';
import { Noticias } from './tickers/Noticias';
import { Menu } from './menu/Menu';




export const NavBar = ({ props, paywall, fixed }) => {
	// const { theme } = useContext(ThemeContext);
	const router = useRouter()

	const { setSidebar, sidebar } = useContext(SidebarContext);
	const { search, setSearch } = useContext(SearchContext)
	const { setModalLogin } = useContext(ModalContext)
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);


	const handleScroll = () => setScrolled(window.scrollY >= 280)

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const isFixed = scrolled && fixed !== false

	return (
		<header
			className={`w-full z-999999 bg-white transition-all duration-500 ease-in-out ${scrolled ? `${fixed === false ? 'relative' : 'fixed'} top-0` : 'relative -top-2.5 shadow-none'
				}`}
		>
			<div className={`relative w-full transition-all duration-500 ${isFixed ? 'h-25 md:h-20' : 'h-27 md:h-24'}`}>
				<div className="relative mx-auto px-4 sm:px-6 lg:px-8 h-full">
					<div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
						<button
							type="button"
							aria-label="Abrir menu"
							onClick={() => setSidebar(!sidebar)}
							className="inline-flex items-center justify-start cursor-pointer"
						>
							<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
								<line y1="0.75" x2="18" y2="0.75" stroke="black" strokeWidth="1.5" />
								<line y1="5.75" x2="18" y2="5.75" stroke="black" strokeWidth="1.5" />
								<line y1="10.75" x2="18" y2="10.75" stroke="black" strokeWidth="1.5" />
							</svg>
						</button>
					</div>

					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
						<button
							type="button"
							onClick={() => window.location.href = '/uagro-next'}
							aria-label="Ir para home"
							className="cursor-pointer"
						>
							<Image
								src={Logo}
								width={300}
								height={300}
								alt="Logo DATAGRO"
								className={`transition-all duration-500 w-46.25 md:w-65 mt-6 `}
								priority
							/>
						</button>
					</div>

					<div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center gap-3">
						<div className=" sm:flex items-center gap-3">
							{/* <button
								type="button"
								onClick={() => setModalLogin(true)}
								className={`hidden text-black rounded cursor-pointer transition-all duration-500 md:block ${isFixed ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
									}`}
							>
								Entrar
							</button> */}

							<div className={`hidden md:block rounded  cursor-pointer transition-all duration-500 ${isFixed ? 'px-2 py-1' : 'px-3 py-2'}`}>
								<button
									type="button"
									onClick={() => setSearch(!search)}
									aria-label="Abrir Caixa de Pesquisa"
									className="inline-flex items-center justify-start cursor-pointer"
								>
									<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.8726 10.9375L16.0634 13.75" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M14.1813 6.875C14.1813 3.7684 11.3241 1.25 7.79962 1.25C4.27513 1.25 1.41797 3.7684 1.41797 6.875C1.41797 9.98163 4.27513 12.5 7.79962 12.5C11.3241 12.5 14.1813 9.98163 14.1813 6.875Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
									</svg>
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>

			<Menu props={props} scrolled={scrolled} />
			<div>
				<Precos props={props} />
				<Noticias props={props} />
			</div>

		</header>
	)
};
