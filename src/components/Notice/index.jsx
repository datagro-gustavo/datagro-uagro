'use client'

import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton"

import { NewsContext } from "@/context/news";
import { ThemeContext } from "@/context/theme";

export const Notice = ({ notice, importanceLevel }) => {
  const { theme } = useContext(ThemeContext);
  const { animated } = useContext(NewsContext)

  const textColor = theme ? "text-[#0f0f10]" : "text-white";

  return (
    <div className="md:w-full  mx-auto mb-10">
      {animated ?
        <Skeleton width={"90%"} />
        :
        <div
          className={`
                    font-metropolis text-lg leading-8 mb-3
                    ${textColor}

                    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-10 [&_h1]:mb-5
                    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-2 [&_h2]:mb-4
                    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                    
                    [&_p]:mb-4
                    [&_a]:underline 
                    [&_a]:text-[verde do uagro]
                    [&_a]:text-inherit
                    [&_a]:hover:text-secondary // isso e do noticias, colocar a cor do uagro
                    [&_strong]:font-semibold
                    [&_b]:font-semibold
                    [&_em]:italic
                    [&_i]:italic

                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:mb-2

                    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6

                    [&_img]:w-full [&_img]:my-6
                  `}
          dangerouslySetInnerHTML={{ __html: notice }}
        />


      }
    </div>
  );
};
