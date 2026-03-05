'use client'

import React, { useContext, useEffect } from 'react'
import Marquee from "react-fast-marquee";

import { NewsContext } from '@/context/news';

export const Noticias = ({ props }) => {
    const { getAll, pageType,tickerNotices} = useContext(NewsContext)


    useEffect(() => {
        getAll()
    },[])

    const ultimasNoticias = Array.isArray(tickerNotices)
        ? tickerNotices.map(({ title, url }) => ({ title, url })).filter(item => item.title)
        : [];



    const onClick = (title, href) => {
        const link = String(title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();

    }
    const data = false;

    // if (!data) {
    //     return (
    //         <Skeleton h={"40px"} w={'100%'} bg={'#001E40'} className={`${margem}`}/>
    //     )
    // }

    return (
        <div>
            <div className={`${pageType !== "home" ? '' : ''} sm:flex bg-[#319e96] w-full h-10`}>
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
                                <span key={`${idx}-${txt}`} className="cursor-pointer text-sm whitespace-nowrap text-white " onClick={() => { onClick(txt.title, txt.url) }}>
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
