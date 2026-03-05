'use client'

import React, { useState, useContext } from "react";

import { ThemeContext } from "@/context/theme";

import sojaIcon from '../../assets/outher_images/Soja.png';
import etanolIcon from '../../assets/outher_images/Etanol.png';
import fertilizanteIcon from '../../assets/outher_images/Foto.png';
import Image from "next/image";

export const ReadAlso = () => {
    const { theme } = useContext(ThemeContext);

    const [data] = useState([
        {
            name: "Soja",
            textPrimary: "Plantio da safra 2025/26 de soja no Paraná chega a 39% da área projetada",
            textSecondary: "O valor da arroba do boi gordo, considerando a praça-base do estado de São Paulo, segundo o Indicador do Boi DATAGRO, fechou, esta sexta-feira (10), com a média de R$ 307,33, alta de 0,03% na comparação com o dia útil anterior.",
            image: sojaIcon,
        },
        {
            name: "Álcool e etanol",
            textPrimary: "Produtividade da cana recua 6,5% nesta safra até setembro, diz CTC",
            textSecondary: "O valor da arroba do boi gordo, considerando a praça-base do estado de São Paulo, segundo o Indicador do Boi DATAGRO, fechou, esta sexta-feira (10), com a média de R$ 307,33, alta de 0,03% na comparação com o dia útil anterior.",
            image: etanolIcon,
        },
        {
            name: "Fertilizantes",
            textPrimary: "Desembarques brasileiros de fertilizantes recuam em setembro",
            textSecondary: "O valor da arroba do boi gordo, considerando a praça-base do estado de São Paulo, segundo o Indicador do Boi DATAGRO, fechou, esta sexta-feira (10), com a média de R$ 307,33, alta de 0,03% na comparação com o dia útil anterior.",
            image: fertilizanteIcon,
        },
    ]);

    const titleColor = theme ? "text-[#18181B]" : "text-white";
    const primaryTextColor = theme ? "text-[#18181B]" : "text-white";
    const secondaryTextColor = theme ? "text-[#494950]" : "text-white";

    return (
        <div>
            <p className={`font-metropolis text-md font-bold mb-3 ${titleColor}`}>Leia também</p>

            {data?.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row mb-5 cursor-pointer">
                    <Image
                        width={30} height={30}
                        className="sm:mr-5 mb-3 sm:mb-0 w-[60%] sm:w-[90%]"
                        src={item.image}
                        alt={item.name}
                    />
                    <div>
                        <p className={`font-metropolis text-sm font-regular mb-1 ${titleColor}`}>
                            {item.name}
                        </p>
                        <p className={`font-metropolis text-md font-bold mb-1 ${primaryTextColor}`}>
                            {item.textPrimary}
                        </p>
                        <p className={`font-metropolis text-sm font-regular mb-1 ${secondaryTextColor}`}>
                            {item.textSecondary}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
