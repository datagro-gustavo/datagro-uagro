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
        <div className="relative">
          <p
            className={`font-metropolis text-lg font-regular mb-3 ${textColor}`}
            dangerouslySetInnerHTML={{ __html: notice }}
          />
  
          {/* {importanceLevel == 3 ? <div className=" w-[100%]  absolute bottom-0  bg-[#ffffffec]   h-[50px]" /> : <></>} */}

        </div>

      }
    </div>
  );
};
