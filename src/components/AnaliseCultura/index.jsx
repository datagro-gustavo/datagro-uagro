'use client'

import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

import { NewsContext } from "@/context/news";
import { useRouter } from 'next/router'

/* COMPONENTS */
import { AnalysisContext } from "../../context/analysis";
import { limitarTexto } from '../../utils/LimitaTexto'
import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import { AnalysisContext } from "@/context/analysis";
import { limitarTexto } from "@/utils/LimitaTexto";
import Image from "next/image";


const Analises = () => {


    const { data, dataBanner } = useContext(AnalysisContext)
    const { linkColor } = useContext(NewsContext)

    const router = useRouter()

    const handleRedirectToAnalysisPage = (item) => {
        const link = String(item?.title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        router.push(`/analysis/${item?.id}/${link}`)
    }
    const handleRedirectToCategoryPage = (noticeId, item) => {
        const slug = item
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        router.push(`/uagro/${noticeId}/${slug}`)
    };


    
    return (

        <section className="xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto mt-3 mb-9  ">

            <h2 className="text-2xl font-semibold mb-0  font-metropolis">Análises</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 mt-5">

                <div className="md:col-span-1 md:order-1 order-1">

                    {data?.slice(0, 2).map(item => {
                        return (

                            <div className="mb-4 cursor-pointer md:h-[190px] " >
                                <Image  width={30} height={30} onClick={() => handleRedirectToAnalysisPage(item)} className=" w-[99%] object-cover h-[259px] md:w-[150px] md:h-[90px] " src={item?.imageUrl} alt={item?.title} />
                                <p className="font-metropolis  font-semibold  mb-1 md:max-w-[150px] text-[0.99rem] mt-2 hover:underline text-secondary" >{item?.markets[0]?.shortname}</p>
                                <p onClick={() => handleRedirectToAnalysisPage(item)} className="font-metropolis text-[#171717] font-semibold text-[0.85rem] md:max-w-[150px] " >{limitarTexto(item?.title, 100)}</p>
                            </div>

                        )
                    })}

                </div>

                <div className="md:col-span-1 md:order-1 order-2 ">

                    {data?.slice(3, 5).map(item => {
                        return (

                            <div className="mb-4 cursor-pointer md:h-[190px] " >
                                <Image  width={30} height={30} onClick={() => handleRedirectToAnalysisPage(item)} className=" w-[99%] object-cover h-[259px] md:w-[150px] md:h-[90px] " src={item?.imageUrl} alt={item?.title}/>
                                <p className="font-metropolis  font-semibold  text-secondary mb-1 mt-2 max-w-[150px] text-[0.99rem] hover:underline" >{item?.markets[0]?.shortname}</p>
                                <p onClick={() => handleRedirectToAnalysisPage(item)} className="font-metropolis text-[#171717] font-semibold text-[0.85rem] md:max-w-[150px] ">{limitarTexto(item?.title, 100)}</p>
                            </div>

                        )
                    })}

                </div>

                <div className="h-[auto] md:order-1 order-0  md:col-span-3">
                    {dataBanner?.length > 0 && (
                        <Swiper
                            style={{
                                '--swiper-pagination-color': !linkColor?.color ? '#8cb024 ' :linkColor?.color  ,
                            }}
                            modules={[Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}

                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true }}
                            className="h-full w-full"
                        >
                            {dataBanner.slice(0, 5).map((item, index) => (
                                <SwiperSlide key={item.id || index}>
                                    <div
                                        onClick={() => handleRedirectToAnalysisPage(item)}
                                        className="cursor-pointer relative h-[305px] 2xl:h-[350px] mb-[4rem] w-full"
                                    >
                                        <Image
                                            src={item?.imageUrl}
                                            width={30}
                                            height={30}
                                            className="w-full h-full object-cover"
                                            alt={item?.title}
                                        />
                                        <div className="absolute bottom-0 w-full bg-black/40 text-white px-4 py-3 text-md hover:underline">
                                            {item?.title}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                </div>


            </div>

        </section>
    );
};

export default Analises;
