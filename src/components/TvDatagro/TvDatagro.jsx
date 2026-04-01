'use client'

import React, { useContext, useEffect, useState } from 'react';


import { VideosContext } from '@/context/videos';
import { Carrousel } from '../Carrousel';


export const TvDatagro = ({ props }) => {
  const { videos } = useContext(VideosContext);
  /* ISOLATE STATE INPUTS */

  const [slides, setSlides] = useState([]);

  const YT1 = "https://www.youtube.com/embed/PyGKqNZNwJA?si=a-GXr6Iax_12ehKA&autoplay=1";
  const YT2 = "https://www.youtube.com/embed/z6FOlJi2rLY?si=qZwlOAfdF1XCeQC5&autoplay=1";
  const YT3 = "https://www.youtube.com/embed/PyGKqNZNwJA?si=a-GXr6Iax_12ehKA&autoplay=1";

  const OPTIONS = { dragFree: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const v = videos.slice(0, 5).map((item, index) => ({
    id: item.id,
    linkUrl: item.linkUrl,
    emphasis: index === 0,
    iframe: item.htmlContent,
    image: item.imageUrl
  }));

  useEffect(() => {
    setSlides(v)
  }, [videos])

  return (
    <div className={`${props} md:py-8 `}>
      <div className="mb-4 md:mb-6">
        <span className="text-2xl md:text-3xl  font-bold">
          <span className='text-[#94C11F]'>DATAGRO</span> TV
        </span>
      </div>

      <div className='grid grid-cols-1 p-5'>

        <Carrousel slides={SLIDES} type={"instagram"} options={OPTIONS} />
        <div className='h-[22px]'></div>
        <Carrousel slides={slides} type="youtube" options={OPTIONS} />

      </div>
    </div>
  );
};
