'use client'
import { NewsProvider } from "@/context/news";
import { limitarTexto } from "@/utils/LimitaTexto";
import { SafeImage } from "../SafeImage";
import Image from "next/image";
import clockIcon from '../../assets/icons/relogio(1) 1(1).png'
import React from "react";
import { useRouter } from "next/navigation";

import arrowRight from '../../assets/icons/arrowRight.png'


const CardMoreNotice = ({ title, description, image, noticeId, slug, matters, publishDate }) => {
    const router = useRouter()

    const formatDate = (date) => {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, "0");

        const month = d.toLocaleDateString("pt-BR", {
            month: "long",
        });

        const capitalizedMonth =
            month.charAt(0).toUpperCase() + month.slice(1);

        const year = d.getFullYear();

        return `${day} ${capitalizedMonth}, ${year}`;
    };
    const getTimeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);

        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) {
            return "Agora mesmo";
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return ` ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} dia${diffInDays > 1 ? "s" : ""}`;
    };


    
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
    const handleRedirectToNewsPage = (slug) => {


        const category = matters[0]?.title || markets[0]?.title


        router.push(`/${slugify(category)}/${slug}`)
    }
    const handleRedirectToEditoriaPage = (id,name) => {
        router.push(`/editoria/${id}/${name}`)
    }

    return (
  <div className="relative hover:border-[#99bf0e69] mx-auto cursor-pointer md:mx-none px-3 rounded-[15px] w-full h-auto py-3 flex flex-col md:flex-row items-center md:mr-5 md:h-auto shadow-md shadow-[#dddddda9] mt-9 border border-[#dddd]">
    
    <SafeImage
        onClick={() => handleRedirectToNewsPage(slug)}
        className="w-full md:w-[229px] h-[180px] md:h-[163px] object-cover rounded-md"
        src={image}
    />

    <div className="md:ml-4 px-2 w-full">
        
        <p
            onClick={() => handleRedirectToNewsPage(slug)}
            className="hover:underline font-metropolis mt-3 text-[#171717] text-[1.1rem] md:mt-0 mb-2 font-bold line-clamp-2"
        >
            {title}
        </p>

        <p
            onClick={() => handleRedirectToNewsPage(slug)}
            className="hover:underline font-metropolis mb-2 text-[0.9rem] text-[#302c2c] line-clamp-3"
        >
            {limitarTexto(description, "220")}
        </p>

        <div className="h-[1px] bg-[#B5B4B4] mt-2" />

        <div className="flex items-center gap-3 flex-wrap">
            {matters?.map(item => {
                return (
                    <p
                        key={item?.id}
                        onClick={() => handleRedirectToEditoriaPage(item?.id, item?.title)}
                        className="hover:underline font-metropolis text-[#98BF0E] text-[0.7rem] mt-3 font-bold uppercase"
                    >
                        {item?.title}
                    </p>
                )
            })}
        </div>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
            <p className="font-metropolis text-[#a0a0a0] font-medium text-[0.9rem]">
                {formatDate(publishDate)}
            </p>

            <span className="flex items-center gap-1 font-metropolis text-[#a0a0a0] font-medium text-[0.9rem]">
                <Image src={clockIcon} className="w-[13px] mt-[0.2rem]" />
                {getTimeAgo(publishDate)}
            </span>
        </div>

        <Image src={arrowRight}  onClick={() => handleRedirectToEditoriaPage(item?.id, item?.title)} className="absolute right-5 bottom-[30px]" />
    </div>
</div>
    )
}

export default CardMoreNotice