'use client'

import React, { useState, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";

import { ThemeContext } from "@/context/theme";


/* IMAGES */
import b3Icon from '../../assets/outher_images/image 4.png';
import b3IconSecondary from '../../assets/outher_images/image 4 (1).png';

export const LastNews = ({ name }) => {
  const { theme } = useContext(ThemeContext);

  // const Image = styled.img`
  //   width: 159px;
  //   object-fit: contain;
  //   margin-right: 1.1rem;
  // `;

  const [data] = useState([
    {
      description: "B3 recebe evento estratégico do Sistema Integrado de Administração de Corretoras",
      image: b3Icon,
      badge: "Economia",
    },
    {
      description: "Investidores negociaram R$936 mi em futuros de ouro na B3 desde julho, aponta DataWise+",
      image: b3IconSecondary,
      badge: "Economia",
    },
  ]);

  const textTitle = theme ? "text-[#18181B]" : "text-white";
  const textBadge = "text-[#FFFFFF]";
  const bgBadge = "bg-[#003A60]";

  return (
    <div className="max-w-7xl mb-10">
      <p className={`font-metropolis text-lg font-semibold mb-3 ${textTitle}`}>
        {name}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center">
            <Image  width={30} height={30} className="w-[150px] h-[85px] mr-2" src={item.image} alt={item.badge} />
            <div>
              <p className={`text-center ${bgBadge} w-[90px] ${textBadge}`}>{item.badge}</p>
              <p className={`font-metropolis text-sm font-bold ${textTitle}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
