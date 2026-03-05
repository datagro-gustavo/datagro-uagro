'use client'

import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { NewsContext } from '@/context/news';
import { ThemeContext } from '@/context/theme';
import { MiniCards } from '../Cards/MiniCards';
import { CardRelevante } from '../Cards/CardRelevante';
import { CardDestaque } from '../Cards/CardDestaque';

/* IMAGES */
import macaubaIcon from '../../assets/outher_images/91.jpg';
import argentinaIcon from '../../assets/outher_images/pexels-juan-pablo-lancia-286674488-16117060.jpg';
import fertilizantesIcon from '../../assets/outher_images/Fertilizantes.jpg';
import chinaIcon from '../../assets/outher_images/China-bandeira.jpg';
import boi1 from '../../assets/boi1.png';


const Clean = styled.div`
	height:${props => props.scrolled ? "15.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}

`;

export const Noticias = ({ props, relevante = true, destaque = true, cultura = false, scrolled }) => {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const { getHighLights, notices } = useContext(NewsContext)

	const textColor = theme ? "text-[#18181B]" : "#FFFFFF";

	useEffect(() => {
		getHighLights()
		// console.log(notices)
	}, [])

	const textCards = [
		{
			titulo: 'China retoma compras agrícolas dos EUA após trégua comercial',
			categoria: 'Soja',
			imagem: argentinaIcon,
			texto: 'Pela primeira vez desde outubro de 2024, compradores chineses reservaram dois carregamentos de trigo; compras de soja ainda são'
		},
		{
			titulo: 'Entregas de fertilizantes no ano até agosto crescem 9,3%',
			categoria: 'Fertilizantes',
			imagem: fertilizantesIcon,
			texto: 'As exportações brasileiras de carne bovina registraram aumento em volume e faturamento, impulsionadas pela demanda asiática. Segundo a ABIEC, o destaque foi a retomada das compras pela China, que representou mais de 55% das vendas externas.'
		},
		{
			titulo: 'China suspende restrições de exportação sobre terras raras e materiais para baterias de lítio',
			categoria: 'Economia',
			imagem: chinaIcon,
			texto: 'Com a recente queda nos preços do etanol hidratado, o combustível voltou a ser mais vantajoso que a gasolina em estados como São Paulo e Goiás. Especialistas apontam que a tendência deve se manter nas próximas semanas, com o aumento da oferta nas usinas.'
		},
		{
			titulo: 'Demanda interna por carne suína se mantém estável, diz Cepea.',
			categoria: 'Pecuária',
			imagem: boi1,
			texto: 'Mesmo com a pressão de custos e a concorrência com outras proteínas, o consumo de carne suína no mercado doméstico tem se mantido estável. O Cepea destaca que promoções e cortes mais acessíveis ajudam a sustentar o consumo nos supermercados.'
		},
		{
			titulo: 'Safra de milho segunda colheita deve ser recorde, segundo Conab.',
			categoria: 'Grãos',
			imagem: boi1,
			texto: 'A Conab estima uma produção recorde de milho na segunda safra, impulsionada pela expansão da área cultivada e pelas boas condições climáticas nas principais regiões produtoras. O aumento da oferta deve pressionar os preços no curto prazo.'
		},
		{
			titulo: 'Safra de milho segunda colheita deve ser recorde, segundo Conab.',
			categoria: 'Grãos',
			imagem: boi1,
			texto: 'A Conab estima uma produção recorde de milho na segunda safra, impulsionada pela expansão da área cultivada e pelas boas condições climáticas nas principais regiões produtoras. O aumento da oferta deve pressionar os preços no curto prazo.'
		},
	];

	const mini = [
		{
			titulo: 'China suspende restrições de exportação sobre terras raras e materiais para baterias de lítio',
			categoria: 'Economia',
			imagem: chinaIcon,
			texto: 'Com a recente queda nos preços do etanol hidratado, o combustível voltou a ser mais vantajoso que a gasolina em estados como São Paulo e Goiás. Especialistas apontam que a tendência deve se manter nas próximas semanas, com o aumento da oferta nas usinas.'
		},
		{
			titulo: 'Demanda interna por carne suína se mantém estável, diz Cepea.',
			categoria: 'Pecuária',
			imagem: boi1,
			texto: 'Mesmo com a pressão de custos e a concorrência com outras proteínas, o consumo de carne suína no mercado doméstico tem se mantido estável. O Cepea destaca que promoções e cortes mais acessíveis ajudam a sustentar o consumo nos supermercados.'
		},
		{
			titulo: 'Safra de milho segunda colheita deve ser recorde, segundo Conab.',
			categoria: 'Grãos',
			imagem: boi1,
			texto: 'A Conab estima uma produção recorde de milho na segunda safra, impulsionada pela expansão da área cultivada e pelas boas condições climáticas nas principais regiões produtoras. O aumento da oferta deve pressionar os preços no curto prazo.'
		},
	];
	return (
		<div>
			<Clean scrolled={scrolled} />

			<div className={`text-[${textColor}] flex flex-col ${relevante ? 'md:flex-row mt-10' : 'md:flex-col'} w-full relative z-50 ${props}`}>

				{/* Esquerda */}
				<div className={`w-full ${relevante ? 'md:w-1/2' : ''} min-w-0 min-h-[350px]`}>
					<CardDestaque
						onClick={() => navigate("/news")}
						imagem={macaubaIcon}
						hImage={`${cultura ? '[200px]' : 'full'}`}
						cultura={cultura}
						categoria={textCards[0].categoria}
						titulo={textCards[0].titulo}
						texto={textCards[0].texto}
					/>
				</div>

				{/* Direita */}
				{relevante ? (
					<div className={`w-full md:w-1/2 flex flex-col pl-0 md:pl-4 mt-6 md:mt-0`}>

						<div className='flex sm:flex-row flex-col'>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:w-1/2">
								{textCards.slice(0, 2).map((noticia, i) => (
									<CardRelevante
										onClick={() => navigate("/news")}
										key={i}
										sm={false}
										titulo={noticia.titulo}
										texto={noticia.texto}
										inserirTexto={false}
										categoria={noticia.categoria}
										imagem={noticia.imagem}
									/>
								))}

							</div>

							<div className='mt-10 sm:mt-0 gap-5 sm:w-1/2 w-full sm:pl-4 flex flex-col'>
								{textCards.slice(0, 4).map((item, i, arr) => (
									<div>
										<MiniCards
											key={`mini-${i}`}
											categoria={item.categoria}
											titulo={item.titulo}
											imagem={item.imagem}
											onClick={() => navigate("/news")}
										/>
										{i < arr.length - 1 && (
											<div className='border mt-2' />
										)}
									</div>
								))}

							</div>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10'>
						{textCards.map((noticia, i) => (
							<CardRelevante
								key={i}
								onClick={() => navigate("/news")}
								sm={false}
								titulo={noticia.titulo}
								texto={noticia.texto}
								inserirTexto={false}
								categoria={noticia.categoria}
								imagem={noticia.imagem}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
