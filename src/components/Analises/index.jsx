'use client'

import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";
import { useNavigate } from "react-router-dom";

/* COMPONENTS */

import { AnalysisContext } from "@/context/analysis";
import { limitarTexto } from "@/utils/LimitaTexto";

const Analises = () => {
    const { data, dataBanner } = useContext(AnalysisContext)

    const navigate = useNavigate()

    const handleRedirectToAnalysisPage = (item) => {
        const link = String(item?.title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        // navigate(`/analysis/${item?.id}/${link}`)
    }
    const handleRedirectToCategoryPage = (noticeId, item) => {
        const slug = item
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        window.location.href = `/uagro/${noticeId}/${slug}`
    };


    return (

        <section className=" xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-4 ">

            <h2 className="text-2xl font-semibold mb-0 font-metropolis">Análises</h2>

            <div className=" bg-[#f1f0f039] xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto mt-6 py-6 px-4">

                <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5">

                    <div className="flex flex-col order-1 md:col-span-1">

                        {data.slice(0, 3)?.map(item => {
                            return (
                                <div className="cursor-pointer flex items-center mb-[1rem]">
                                    <Image  width={30} height={30} onClick={() => handleRedirectToAnalysisPage(item)} className="w-[120px] h-[90px]" src={item?.imageUrl} alt={item?.title}/>
                                    <div>
                                        <p onClick={() => handleRedirectToCategoryPage(item?.markets[0]?.id, item?.markets[0]?.title)} className="font-metropolis  font-semibold ml-3 text-secondary mb-2 max-w-[150px] text-[0.99rem] hover:underline">{item?.markets[0]?.shortname}</p>
                                        <p onClick={() => handleRedirectToAnalysisPage(item)} className="font-metropolis text-[#171717] ml-3 font-semibold text-[0.85rem] max-w-[150px] ">{limitarTexto(item?.title, 50)}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <button className="hidden md:block bg-secondar  y mt-8 w-[134px] h-[40px] rounded-md text-[#FFFFFF]">Ver mais análises</button>
                    </div>

                    <div className="flex flex-col  order-2 col-span-2 md:col-span-1">

                        {data.slice(4, 7)?.map(item => {
                            return (
                                <div className="cursor-pointer flex items-center mb-[1rem]">
                                    <Image  width={30} height={30} onClick={() => handleRedirectToAnalysisPage(item)} className="w-[120px] h-[90px]" src={item?.imageUrl} alt={item?.title}/>
                                    <div>
                                        <p onClick={() => handleRedirectToCategoryPage(item?.markets[0]?.id, item?.markets[0]?.title)} className="font-metropolis  font-semibold  ml-3 text-secondary  mb-2 max-w-[150px]  text-[0.95rem] hover:underline">{item?.markets[0]?.shortname}</p>
                                        <p onClick={() => handleRedirectToAnalysisPage(item)} className="font-metropolis ml-3 text-[#171717]  font-semibold text-[0.85rem] max-w-[150px]  hover:underline cursor-pointer  ">{limitarTexto(item?.title, 50)}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <button className="block md:hidden bg-secondary mt-8 w-[134px] h-[40px] rounded-md text-[#FFFFFF]">Ver mais análises</button>

                    </div>

                    <div className="h-[auto] order-0 md:order-3  col-span-2 2xl:col-span-3">
                        {dataBanner?.length > 0 && (
                            <Swiper
                                style={{
                                    '--swiper-pagination-color': '#8cb024 ',
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
                                                width={30} height={30}
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

            </div>
        </section>
    );
};

export default Analises;
