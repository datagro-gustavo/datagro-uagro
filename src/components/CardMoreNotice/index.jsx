'use client'
import { NewsProvider } from "@/context/news";

import { SafeImage } from "../SafeImage";

import React from "react";
import { useRouter } from "next/navigation";

const CardMoreNotice = ({ title, description, image, noticeId, slug }) => {
    const router = useRouter()
    const handleRedirectToNewsPage = (slug) => {
  
        router.push(`/noticia/${slug}`)
    }

    return (
        <div onClick={() => handleRedirectToNewsPage(slug)} className=" cursor-pointer md:mx-none   flex-col md:flex flex-row items-center md:w-[699px] md:mr-5  h-[430px] md:h-[160px]   shadow-md shadow-[#dddddd88] mt-9  border border-[#dddd]" >
            <SafeImage className="md:w-[240px] w-full md:h-[160px] h-[220px] "  src={image} />
            <div className="ml-4 max-w-[520px] px-2">
                <p className="font-metropolis text-[#319e96] text-[0.9rem] md:mt-0 mt-5 font-bold">{title}</p>
                {/* <p className="font-metropolis mt-1 text-[1.1rem] text-[#000000] font-bold ">Chuvas de janeiro afetaram mercado citrícola paulista</p> */}
                <p className="font-metropolis mt-1 text-[0.9rem] text-[#302c2c]">{description}</p>
            </div>
        </div>
    )
}

export default CardMoreNotice