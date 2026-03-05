
'use client'

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9uw73eCSl2CrRYZGgp6EB9q4jA7nq4nDLg&s",
            title: "Frete rodoviário - Novembro/25"
        },
        {
            img: "https://via.placeholder.com/600x400",
            title: "Mercado aquecido deve impulsionar fretes em 2026"
        },
        {
            img: "https://via.placeholder.com/600x400?text=Slide+3",
            title: "Análise semanal — Transporte e Logística"
        }
    ];

    return (
        <div className="w-full">

            <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000 }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-[234px] rounded-xl overflow-hidden"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-[234px] w-full">
                            <Image
                                width={30} height={30}
                                src={slide.img}
                                className="w-full h-full object-cover"
                                alt="image"
                            />

                            <div className="absolute bottom-0 w-full bg-black/40 text-white px-4 py-3 text-sm">
                                {slide.title}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-center gap-3 mt-5">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all 
                            ${activeIndex === i ? "bg-[#97B71D]" : "bg-[red]"}
                        `}
                    ></div>
                ))}
            </div>

        </div>
    );
};

export default Slider;
