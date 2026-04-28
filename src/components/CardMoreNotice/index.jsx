'use client'

import { limitarTexto } from "@/utils/LimitaTexto";
import { SafeImage } from "../SafeImage";
import Image from "next/image";
import clockIcon from '../../assets/icons/relogio(1) 1(1).png'
import React from "react";
import { useRouter } from "next/navigation";
import arrowRight from '../../assets/icons/arrowRight.png'

const CardMoreNotice = ({ title, description, image, noticeId, slug, matters, publishDate }) => {
    const router = useRouter()

    const slugify = (text) => {
        return text
            ?.toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .trim();
    };

    const category = matters?.[0]?.title;
    const newsHref = `/${slugify(category)}/${slug}`;

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = d.toLocaleDateString("pt-BR", { month: "long" });
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        const year = d.getFullYear();

        return `${day} ${capitalizedMonth}, ${year}`;
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);

        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) return "Agora mesmo";

        const diffInMinutes = Math.floor(diffInSeconds / 60);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInHours < 24) {
            return `${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
        }

        const diffInDays = Math.floor(diffInHours / 24);

        return `${diffInDays} dia${diffInDays > 1 ? "s" : ""}`;
    };

    const handleRedirectToNewsPage = () => {
        router.push(newsHref);
    };

    const handleRedirectToEditoriaPage = (name) => {
        router.push(`/${slugify(name)}`);
    };

    return (
        <div className="relative hover:border-[#99bf0e69] mx-auto cursor-pointer md:mx-none px-3 rounded-[15px] w-full h-auto py-3 flex flex-col md:flex-row items-center md:mr-5 md:h-auto shadow-md shadow-[#dddddda9] mt-9 border border-[#dddd]">


            <a
                className="w-full md:w-[320px]"
                href={newsHref}
                onClick={(e) => {
                    e.preventDefault();
                    handleRedirectToNewsPage();
                }}
            >

            <a className="w-full md:w-[320px]" href={`/${url}/${slug}`}>
                <SafeImage
                    className="w-full md:w-[229px] h-[180px] md:h-[163px] object-cover rounded-md"
                    src={image}
                />
            </a>

            <div className="md:ml-4 px-2 w-full">
                {matters?.map(item => {
                    const editoriaHref = `/${slugify(item?.title)}`;

                    return (
                        <a
                            href={editoriaHref}
                            key={item?.id}
                            onClick={(e) => {
                                e.preventDefault();
                                handleRedirectToEditoriaPage(item?.title);
                            }}
                            className="hover:underline block font-metropolis text-[#98BF0E] text-[0.7rem] mt-1 mb-2 font-bold uppercase"
                        >
                            {item?.title}
                        </a>
                    )
                })}

                <a
                    href={newsHref}
                    onClick={(e) => {
                        e.preventDefault();
                        handleRedirectToNewsPage();
                    }}
                    className="hover:underline font-metropolis mt-3 text-[#171717] text-[1.1rem] md:mt-0 mb-2 font-bold line-clamp-2"
                >
                    {title}
                </a>

                <a
                    href={newsHref}
                    onClick={(e) => {
                        e.preventDefault();
                        handleRedirectToNewsPage();
                    }}
                    className="hover:underline font-metropolis mb-2 text-[0.9rem] text-[#302c2c] line-clamp-3"
                >
                    {limitarTexto(description, "220")}
                </a>

                <div className="h-[1px] bg-[#B5B4B4] mt-2" />

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <p className="font-metropolis text-[#a0a0a0] font-medium text-[0.9rem]">
                        {formatDate(publishDate)}
                    </p>

                    <span className="flex items-center gap-1 font-metropolis text-[#a0a0a0] font-medium text-[0.9rem]">
                        <Image src={clockIcon} className="w-[13px] mt-[0rem]" alt="Relógio" />
                        {getTimeAgo(publishDate)}
                    </span>
                </div>

                <Image
                    src={arrowRight}
                    onClick={handleRedirectToNewsPage}
                    className="absolute right-5 bottom-[10px] cursor-pointer"
                    alt="Ver notícia"
                />
            </div>
        </div>
    )
}

export default CardMoreNotice
