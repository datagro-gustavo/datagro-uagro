'use client'

import { useRouter } from 'next/navigation'

import React, { useContext, useState } from "react";

const Tags = ({ notice }) => {

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

    const handleNavigateToCulturePage = (item) => {
        router.push(`/assunto/${slugify(item?.name)}`)
    }


    return (

        <div className=" flex-col md:flex flex-row items-center mb-16">
            {notice?.tags?.length > 0 && <p className="mr-0 font-medium  md:mr-1.5">Assuntos:</p>}

            {
                notice?.tags?.map(item => {
                    return (
                        <div onClick={() => handleNavigateToCulturePage(item)} className="mt-3 md:mt-0 cursor-pointer ml-2 flex items-center justify-center rounded-md  px-3 w-[auto] h-[30px] text-white bg-[#7fb954]">
                            {item?.name}
                        </div>
                    )
                })
            }

        </div>

    )
}

export default Tags