'use client'

import React, { useContext, useEffect, useState } from 'react'
import { replace, useNavigate } from 'react-router-dom';

import { limitarTexto } from '@/utils/LimitaTexto.js';
import { ThemeContext } from '@/context/theme';
import { CardRelevante } from '../Cards/CardRelevante.jsx';

const isMobileWidth = () => window.innerWidth <= 768;
import etanolIcon from '../../assets/outher_images/Etanol-Fotolia_41980613_Subscription_Monthly_M.jpg'
import dolarIcon from '../../assets/outher_images/Dolar.jpg'
import bolsaChicago from '../../assets/outher_images/Bolsa-de-Chicago (1).jpg'



export const UltimasNoticias = ({ props,name }) => {
  const { theme } = useContext(ThemeContext)
  const [isMobile, setIsMobile] = useState(isMobileWidth());

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textCards = [];
  const textColor = theme ? "text-[#18181B]" : "text-white";


  return (
    <div >
      <div className={props}>
        <span className={`text-2xl font-bold text-[${textColor}]`}>{name ? name : 'Últimas notícias' }</span>
      </div>


      <div className='flex flex-col gap-5 md:flex-row '>
        {textCards.map((noticia, idx) => (
          <CardRelevante
            key={idx}
            onClick={() => navigate("/news", {viewTransition:true})}
            sm={true}
            mobile={isMobile}
            titulo={noticia.titulo}
            texto={noticia.texto}
            inserirTexto={isMobile ? false : true}
            categoria={noticia.categoria}
            imagem={noticia.imagem}
          />
        ))}
      </div>
    </div>
  );
}
