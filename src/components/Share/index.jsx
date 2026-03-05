'use client'

import React from "react";

import twitterIcon from '../../assets/icons/Ellipse 1.png'
import tiktokIcon from '../../assets/icons/Ellipse 4.png'
import facebookIcon from '../../assets/icons/Ellipse 2.png'
import whatsIcon from '../../assets/icons/whatsIcon.png'
import Image from "next/image";
const Share = () => {

    const url = `${window.location.origin}${window.location.pathname}`;
    const pathName = ` ${window.location.hostname}:${window.location.pathname}`
    pathName.substring(0, 10)

    const shareTwitter = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const shareFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const shareWhatsApp = () => {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const shareTikTok = () => {
        const shareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };



    return (
        <div className="
            fixed 
            top-[50%] 
            left-[50%] 
            translate-x-[-50%] 
            translate-y-[-50%]
            bg-white 
            flex
            flex-col
            md:w-[375px]
            w-[80%] 
            h-[288px]
            z-[99999999999]

            rounded-[20px]
            
        ">
            <div className="flex flex-row items-center pl-[19px]  h-[70px] border-b-2 border-[#D7D7D7]">
                <svg className="mr-5" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_90)">
                        <path d="M8.07268 6.86852L13.469 1.46627C13.804 1.13089 13.804 0.587136 13.469 0.251784C13.134 -0.0835948 12.5909 -0.0835948 12.256 0.251784L6.86023 5.6546L1.46449 0.251784C1.12952 -0.0835948 0.586422 -0.0835948 0.251475 0.251784C-0.0834726 0.587163 -0.0834994 1.13092 0.251475 1.46627L5.64777 6.86852L0.251475 12.2708C-0.0834994 12.6062 -0.0834994 13.1499 0.251475 13.4853C0.586449 13.8206 1.12955 13.8207 1.46449 13.4853L6.86023 8.08244L12.256 13.4853C12.5909 13.8207 13.134 13.8207 13.469 13.4853C13.8039 13.1499 13.8039 12.6062 13.469 12.2708L8.07268 6.86852Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_90">
                            <rect width="13.72" height="13.7366" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p className="font-metropolis  text-[18px]">Compartilhar externamente</p>
            </div>


            <div className="flex flex-row justify-between pt-7 pl-[19px] pr-[19px] ">

                <div onClick={() => shareTwitter()} className="flex flex-col items-center">
                    <Image  width={30} height={30} src={twitterIcon} alt="Twitter"/>
                    <p className="font-metropolis text-[14px] mt-2 text-[#888888]">Twitter</p>
                </div>

                <div onClick={() => shareTikTok()} className="flex flex-col items-center">
                    <Image  width={30} height={30}  src={tiktokIcon} alt="Tiktok"/>
                    <p className="font-metropolis text-[14px] mt-2 text-[#888888]">Tiktok</p>
                </div>


                <div onClick={() => shareFacebook()} className="flex flex-col items-center">
                    <Image  width={30} height={30} src={facebookIcon} alt="Facebook"/>
                    <p className="font-metropolis text-[14px] mt-2 text-[#888888]">Facebook</p>
                </div>


                <div onClick={() => shareWhatsApp()} className="flex flex-col items-center">
                    <Image  width={30} height={30} src={whatsIcon} alt="WhatsApp"/>
                    <p className="font-metropolis mt-2 text-[14px] text-[#888888]">WhatsApp</p>
                </div>

            </div>

            <div className="flex justify-center relative mt-5 ml-[19px] mr-[19px]">
                <input value={pathName.substring(0, 39)
                } className=" text-[#8D9CA5] outline-none w-[375px] h-[48px] rounded-[4px] border border-[#C5C5C5]" />

                <div className="absolute  right-3 top-4 bg-[white] ">
                    <svg className="cursor-pointer" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.988 6.59998H6.99399C6.25834 6.59998 5.66199 7.31632 5.66199 8.19998V15.4C5.66199 16.2836 6.25834 17 6.99399 17H12.988C13.7236 17 14.32 16.2836 14.32 15.4V8.19998C14.32 7.31632 13.7236 6.59998 12.988 6.59998Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.998 11.4H2.332C1.97873 11.4 1.63993 11.2314 1.39013 10.9314C1.14034 10.6313 1 10.2243 1 9.8V2.6C1 2.17565 1.14034 1.76869 1.39013 1.46863C1.63993 1.16857 1.97873 1 2.332 1H8.326C8.67927 1 9.01807 1.16857 9.26787 1.46863C9.51766 1.76869 9.658 2.17565 9.658 2.6V3.4" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

        </div>
    )
}

export default Share;
