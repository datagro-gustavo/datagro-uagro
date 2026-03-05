'use client'

import React, { useCallback, useContext, useEffect, useState, } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carrousel.css";


import { InstaGramContext } from "@/context/instagram";
import CardYoutube from "../CardYoutube";
import CardInstagram from "../CardInstagram";


export function Carrousel({ slides, type }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const { setModalInstagram, modalInstagram } = useContext(InstaGramContext)

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="embla">
      <button
        style={{ background: type == "instagram" ? '' : 'none' }}
        className="embla__button embla__button--prev"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        disabled={prevDisabled}
      >
        {type == "instagram"

          ?
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_208_283)">
              <path d="M4.55201 10.848L1.00001 5.44797L4.55201 -2.61557e-05L7.79201 -2.58724e-05L4.52801 5.44797L7.79201 10.848L4.55201 10.848ZM3.83201 6.74397L3.83201 4.12797L12.424 4.12797L12.424 6.74397L3.83201 6.74397Z" fill="black" />
            </g>
            <defs>
              <filter id="filter0_d_208_283" x="0" y="0" width="13.424" height="12.848" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_208_283" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_208_283" result="shape" />
              </filter>
            </defs>
          </svg>
          :
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="40" rx="6" fill="#9CA3AF" />
            <path d="M9.13786 19.072L19.7664 8.44401C20.2788 7.93159 21.11 7.93159 21.6225 8.44401L22.8622 9.68377C23.3741 10.1956 23.3747 11.0247 22.8644 11.5377L14.4409 20L22.8639 28.4629C23.3747 28.9759 23.3736 29.8049 22.8617 30.3168L21.6219 31.5566C21.1095 32.069 20.2782 32.069 19.7658 31.5566L9.13786 20.9281C8.62543 20.4156 8.62543 19.5844 9.13786 19.072Z" fill="black" />
          </svg>


        }


      </button>

      <div className="embla__viewport" ref={emblaRef}>

        <div className="embla__container ">
          {slides.map((slide, idx) => (
            type == "instagram"

              ?
              <div className="embla__slide" onClick={() => setModalInstagram(true)} key={idx}>
                <CardInstagram />
              </div>
              :
              <div className="embla__slide" key={idx}>
                <CardYoutube emphasis={slide?.emphasis} link={slide?.linkUrl} html={slide?.iframe} image={slide?.image} />
              </div>

          ))}
        </div>
      </div>

      <button
        style={{ background: type == "instagram" ? '' : 'none' }}
        className="embla__button embla__button--next"
        onClick={() => emblaApi && emblaApi.scrollNext()}
      // disabled={nextDisabled}
      >
        {type == "instagram"

          ?
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_208_283)">
              <path d="M8.87201 4.673e-05L12.424 5.40005L8.87201 10.848H5.63201L8.89601 5.40005L5.63201 4.673e-05H8.87201ZM9.59201 4.10405V6.72005H1V4.10405H9.59201Z" fill="black" />
            </g>
            <defs>
              <filter id="filter0_d_208_283" x="0" y="0" width="13.424" height="12.848" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood  result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_208_283" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_208_283" result="shape" />
              </filter>
            </defs>
          </svg>
          :
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="32" y="40" width="32" height="40" rx="6" transform="rotate(-180 32 40)" fill="#9CA3AF" />
            <path d="M22.8621 20.928L12.2336 31.556C11.7212 32.0684 10.89 32.0684 10.3775 31.556L9.13777 30.3162C8.62589 29.8044 8.62535 28.9753 9.13558 28.4623L17.5591 20L9.13613 11.5371C8.62535 11.0241 8.62644 10.1951 9.13832 9.68318L10.3781 8.44341C10.8905 7.93099 11.7218 7.93099 12.2342 8.44341L22.8621 19.0719C23.3746 19.5844 23.3746 20.4156 22.8621 20.928Z" fill="black" />
          </svg>


        }

      </button>
    </div>
  );
}
