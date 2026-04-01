'use client'
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@/hooks/useClickOutside';
import React, { useCallback, useContext, useRef,useState,useEffect } from 'react'
import styled from 'styled-components';
import { SearchContext } from '@/context/search';
import Input from '@/assets/Input';
import Image from 'next/image';
import { SafeImage } from '../SafeImage';


const CardWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 421px;
  min-height: 127px;
  background-color: white;
  box-shadow: 0 0 5px #7472729e;
  border-radius: 5px;

  @media screen and (max-width:920px){

    width: 90%;
    
  }

`

const Content = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 90%;
  min-height: 65px;
  max-height: 140px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  #textPrimary{
    cursor: pointer;
    font-size: 0.9rem;
    text-align: center;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
  }

  #textSecondary {
    cursor: pointer;
    font-size: 0.9rem;
    text-align: center;
    color:black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  &::-webkit-scrollbar {
    width: 8px; 
  }

  &::-webkit-scrollbar-track {
    background: #F5E9E9; 
  }

  &::-webkit-scrollbar-thumb {
    background-color: #F5E9E9; 
    border-radius: 10px;
    border: 2px solid #1e1e1e; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #F5E9E9; 
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #303030 #1e1e1e;

  @media screen and (max-width:920px){
    p{
      max-width: 90%;
    }
  }

`;

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

export const SearchBox = () => {

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



  const navigate = useRouter()

  const { search, setSearch, get, data } = useContext(SearchContext)
  const ref = useRef(null);
  const close = useCallback(() => setSearch(false), [setSearch]);
  const route = useRouter()
  useClickOutside(ref, close, search);

  const handleRedirectToNewsPage = (category,slug) => {

    route.push(`/${slugify(category)}/${slug}`)
  }

  const handleRedirectToCulturePage = (category) => {
    route.push(`/${slugify(category)}`)

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
    <>
      {search

        ?
        <div ref={ref} className='absolute top-[40px] h-[30px] z-50 '>
          <CardWrapper>
            <Input placeholder={"Pesquise por algo ..."} onChange={(e) => get(e.target.value)} />
            <Content>
              {data?.map(item => {

                return (
                  <div
                    className="relative pl-2 pr-5 flex items-center justify-between mb-3.5"
                  >
                    <div className="w-[99%] border-b pb-2 border-[#000000] mt-5 flex flex-col items-baseline leading-tight">
                      <p id="textPrimary" className="font-metropolis hover:underline cursor-pointer" onClick={() => handleRedirectToNewsPage(item.matters[0]?.title,item?.slug)}>
                        {item?.title}
                      </p>

                      <div
                        onClick={() => handleRedirectToCulturePage(item?.matters[0]?.title)}
                        className={`mt-2 rounded-md px-1 py-1 hover:opacity-80 transition-opacity cursor-pointer`}
                        style={{ backgroundColor: item?.matters[0]?.color }}
                      >
                        <p id="textSecondary" style={{ color: "black" }} className="text-md font-bold text-black">
                          {item.matters[0]?.title}
                        
                        
                        </p>
                      </div>

                      <p id="textSecondary" className="mt-3 text-sm text-black">
                        {item?.publishDate ? formatDate(item.publishDate) : ""}
                      </p>
                    </div>

                    <SafeImage
                      width={90} height={90}
                      src={item?.imageUrl}
                      alt={item?.title}
                      onClick={() => handleRedirectToNewsPage(item.matters[0]?.title,item?.slug)}
                      className="absolute right-7 w-[50px] h-[50px] object-cover hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </div>
                )
              })}

            </Content>
          </CardWrapper>
        </div>

        :
        <></>
      }
    </>
  )
}
