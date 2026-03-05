'use client'

import React, { useState, useContext } from 'react'


import { AnalysisContext } from '@/context/analysis';
import { NewsContext } from '@/context/news';

import { useNavigate } from 'react-router-dom';

const LatestAnalyses = () => {
    const navigate = useNavigate()
    const { linkColor } = useContext(NewsContext)
    const { dataVipAnalysis, data } = useContext(AnalysisContext)

    const [dataState] = useState([
        {
            id: 1,
            name: "ÚLTIMAS ANÁLISES"
        },
        {
            id: 2,
            name: "+ LIDAS"
        }
    ])
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
        });
    };
    const handleRedirectToAnalysisPage = (item) => {
        const link = String(item?.title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        navigate(`/analysis/${item?.id}/${link}`)
    }
    const [check, setCheck] = useState(1)

    return (

        <div className='grid grid-cols-1 md:grid-cols-5 mb-9 '>

            <div className='md:col-span-2 mb-10 md:mb-0 md:w-[340px]  '>
                <div className='flex border-b-[3px] border-[#000000]  justify-between '>

                    {dataState?.map(item => {
                        return (
                            <div onClick={() => setCheck(item?.id)}
                                style={{ background: item?.id == check ? '#8cb024 ' : '#FFFFFF', color: item?.id == check ? '#FFFFFF' : '#000000', cursor: "pointer" }}
                                className=' px-4 py-1 flex min-w-[120px] justify-center items-center text-[#ffffff]'>
                                <p className=' text-[13px]  font-metropolis'>{item?.name}</p>
                            </div>

                        )
                    })}

                </div>

                <div className='flex flex-col  border-b-[3px] border-[#000000] '>

                    {data?.slice(0, 3).map((item, index) => {

                        const bgClass = index % 2 === 0
                            ? '#dddddd66'
                            : 'white'

                        return (
                            <div onClick={() => handleRedirectToAnalysisPage(item)} style={{ background: bgClass }} className=' hover:border-l-8 border-[#690d0dc0]  py-3 px-1 min-h[40px] cursor-pointer'>
                                <p className=' font-metropolis'>{item?.title}</p>
                            </div>

                        )
                    })}


                    <div className=' flex items-center justify-center   bg-[#dddddd66] py-3 px-1 min-h[40px] cursor-pointer'>
                        <button className='font-metropolis  hover:underline'>todas as analises</button>

                    </div>

                </div>
            </div>

            <div className='md:col-span-3 md:w-[full]'>
                <div style={{ background: linkColor?.color }} className='flex pl-5 py-3 text-[#FFFFFF] bg-[]  justify-between '>
                    <p className='font-metropolis'>RELÁTORIOS VIP</p>
                </div>

                {dataVipAnalysis?.map((item, index) => {

                    const bgClass = index % 2 === 0
                        ? '#dddddd66'
                        : 'white'

                    return (

                        <div onClick={() => handleRedirectToAnalysisPage(item)} style={{ background: bgClass }} className='  py-3 px-1 min-h[40px] cursor-pointer'>
                            <p className=' font-metropolis text-[14px]'>{formatDate(item?.publishDate)} {item?.title}</p>
                        </div>

                    )
                })}


            </div>

        </div>
    )
}

export default LatestAnalyses