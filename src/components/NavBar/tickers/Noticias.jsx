'use client'

import React, { useContext, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";

import { NewsContext } from '@/context/news';

export const Noticias = ({ props }) => {
    const { getAll, pageType,tickerNotices} = useContext(NewsContext)
    const router = useRouter()

    	const slugify = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espaços -> hífen
    .replace(/[^\w-]+/g, "") // remove caracteres especiais
    .replace(/--+/g, "-") // evita múltiplos hífens
    .trim();
};


    useEffect(() => {
        getAll()
    },[])

    const ultimasNoticias = Array.isArray(tickerNotices)
        ? tickerNotices.map(({ title, url, slug,matters,markets }) => ({ title, url,slug,matters,markets })).filter(item => item.title)
        : [];



    const handleRedirectToNoticePage = (slug,data) => {

        
        const category = data?.matters[0]?.title || data?.markets[0]?.title


        const link = String(slug)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
            router.push(`/${slugify(category)}/${data?.slug}`)

    }
    const data = false;

    // if (!data) {
    //     return (
    //         <Skeleton h={"40px"} w={'100%'} bg={'#001E40'} className={`${margem}`}/>
    //     )
    // }

    return (
        <div>
            <div className={`${pageType !== "home" ? '' : ''} sm:flex bg-[#7fb954] w-full h-10`}>
                <div className={`flex w-full `}>
                    <div className='flex w-36 items-center '>
                        <span className=' text-white font-regular text-sm ml-4'> Últimas notícias </span>
                    </div>

                    <Marquee
                        speed={45}
                        gradient={false}
                        pauseOnHover={true}
                        direction='left'
                        autoFill
                        className='w-full'
                    >

                        {ultimasNoticias.map((txt, idx) => (
                            <div className='border-r pl-5 pr-5 border-[#E3E3E3]'>
                                <span key={`${idx}-${txt}`} className="cursor-pointer text-sm whitespace-nowrap text-white " onClick={() => handleRedirectToNoticePage(txt?.slug,txt) }>
                                    {txt.title}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    )
}
