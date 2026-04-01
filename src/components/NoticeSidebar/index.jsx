'use client'

import Image from "next/image";
import React, { useContext,useState,useEffect } from "react";
import { SidebarContext } from "@/context/sidebar";
import { useRouter } from "next/navigation";

import styled from "styled-components";
import { SafeImage } from "../SafeImage";

const Box = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img{
        object-fit: cover;
        border-radius: 100%;
        width: 90px;
        height: 90px;
        margin-bottom: 0.9rem;
    }

    span{
       text-align: center;
       font-size: 0.9rem;
       display: -webkit-box;           
       width: 250px;
       cursor: pointer;
       color: #2f3a31;
       overflow: hidden;               
       text-overflow: ellipsis;      
       -webkit-box-orient: vertical;   
       -webkit-line-clamp: 3;        
       line-height: 1.4em;           
       max-height: calc(1.4em * 3);    
    }

`
const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    @media screen and (max-width:920px){
        height: auto;
        margin-bottom: 2rem;
        
    }

`

// const SafeImage = ({ src, alt, className }) => {
//     const [currentSrc, setCurrentSrc] = useState(null);
//     const [triedJpeg, setTriedJpeg] = useState(false);
//     const [error, setError] = useState(false);

//     const transformUrl = (url) => {
//         if (!url) return null;

//         const match = url.match(/\/noticias_img\/.*/);

//         if (match) {
//             return `https://s3-uagro.s3.amazonaws.com${match[0]}`;
//         }

//         return url;
//     };

//     useEffect(() => {
//         if (!src) return;

//         const baseUrl = transformUrl(src);
//         if (!baseUrl) return;

//         // Remove extensão atual
//         const noExtension = baseUrl.replace(/\.(jpg|jpeg)$/i, "");

//         // Primeiro tenta .jpg
//         setCurrentSrc(`${noExtension}.jpg`);
//         setTriedJpeg(false);
//         setError(false);
//     }, [src]);

//     const handleError = () => {
//         if (!triedJpeg && currentSrc) {
//             // Se falhou .jpg, tenta .jpeg
//             const noExtension = currentSrc.replace(/\.(jpg|jpeg)$/i, "");
//             setCurrentSrc(`${noExtension}.jpeg`);
//             setTriedJpeg(true);
//         } else {
//             setError(true);
//         }
//     };



//     if (!currentSrc || error) {
//         return (
//             <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
//                 <div className="w-8 h-8 bg-neutral-300 rounded-sm" />
//             </div>
//         );
//     }

//     return (
//         <Image
//             src={currentSrc}
//             alt={alt}
//             width={500}
//             height={500}
//             className={className}
//             loading="lazy"
//             onError={handleError}
//         />
//     );
// };


export const NoticeSidebar = ({ data, theme, onClick }) => {
    const navigate = useRouter()
    const {setSidebar} = useContext(SidebarContext)
    // const handleRedirectToCulturePage = (marketId, category) => {
    //     navigate.push(`/cultura/${marketId}/${category}`)
    // }
    const handleRedirectToNewsPage = (slug) => {
        navigate.push(`/noticia/${slug}`)
    }
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };
    
    return (
        <CardWrapper onClick={onClick}>
            <Box theme={theme}>
                <SafeImage width={300} height={300} src={data?.imageUrl} alt="image" />
                {/* <div className='mt-0 mb-2 rounded-md px-1  py-1 cursor-pointer' style={{ background: data?.markets[0].color }}>
                    <p onClick={() => handleRedirectToCulturePage(data?.markets[0]?.id, data?.markets[0]?.title)} className="text-[#FFFFFF] font-metropolis text-[14px] mt-1 mb-1">{data?.markets[0]?.title}</p>
                </div> */}
                <span onClick={() => handleRedirectToNewsPage(data?.slug)} className='font-metropolis'><a style={{ textDecoration: "underline" }}> {data?.title}</a></span>
                <span className='font-metropolis mt-1 '>{data?.publishDate ? formatDate(data.publishDate) : ""}</span>

            </Box>
        </CardWrapper>
    )

}


