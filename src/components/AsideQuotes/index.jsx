'use client'

import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

/* COMPONENTS */
import { ThemeContext } from "@/context/theme";
import { NewsContext } from "@/context/news";
import { ColumnContext } from "@/context/column";

import { LatestQuotes } from "../LatestQuotes";
import { QuotesTableMini } from "../QuotesMiniTable";

/* IMAGES */
import imagePrimary from '../../assets/banners/image 5.png'
import imageGafff from '../../assets/banners/banner-datagro.png'

const AsideEl = styled.aside`
    @media screen and (max-width:920px){
        display: none;
        
    }
`
const ImagePrimary = styled.img`
    width: 300px;
    cursor: pointer;
    border-radius: 3px;
    margin: 3rem auto;
    object-fit: contain;
`;
const ImageSecondary = styled.img`
    width: 350px;
    margin: 0 auto;
`
const ImageBanner = styled.img`
    margin-top: 3rem;
`
const Button = styled.button`
    width: 149.81px;
    height: 35px;
    background-color: #000000;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CardWrapper = styled.div`
    ul{
        margin-top: 0.9rem;
    }
`
const BoxText = styled.div`
    margin-top: 1rem;
    width: 145px;
    padding: 0.2rem;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`
const ButtonPrice = styled.button`
    margin: 0 auto;
    margin-bottom: 2rem;
    width: 187.81px;
    height: 35px;
    background-color: #8CB024;
    text-transform: uppercase;
    color: white;
    font-size: 0.9rem;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const AsideQuotes = () => {

    const [idPlaylist, setIdPlaylist] = useState("4hDAPlV5AvNKbyjhRnn3zs");
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const { columnistHistory, columnistName, columnist, columnistArticles, setColumnistName, setColumnistImage, setColumnistMiniBio, setColumnistId, animated, setAnimated, animatedColumnist } = useContext(ColumnContext)
    const { notices, pageType } = useContext(NewsContext)

    const location = useLocation()
    const isHome = location.pathname === "/"
    const isNews = location.pathname.startsWith("/news");

    const onClick = (title, href, author, image, miniBio, id, columnistId) => {
        setAnimated(true)
        const link = String(title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        setColumnistName(author)
        setColumnistImage(image)
        setColumnistMiniBio(miniBio)
        setColumnistId(columnistId)
        navigate(`/artigo/${columnistId}/${id}/${link}`, { state: { url: href } })
    }

    const onClickNotice = (idNoticia, title, href) => {
        setAnimated(true)

        const link = String(title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();

        navigate(`/news/${idNoticia}/${link}`, { state: { url: href } })
    }

    return (
        <AsideEl className="hidden md:flex flex-col w-2/4">
            {/* <Banner />  */}
            {/* <Button className="font-metropolis font-medium text-lg ">Novo Episódio</Button> */}
            {/* <Spotify playlistId={idPlaylist} /> */}

            {/* <MiniChartAside /> */}

            {/* {!animated && columnistHistory && columnistName && !isHome && (
                <>

                    <p className="text-[#191919]  font-metropolis font-bold mt-3    ">Mais artigos - {columnistName}</p>
                    {columnistHistory?.slice(0, 6).map((item) => (
                        <>
                            <p className="text-[#191919] text-sm font-metropolis mt-5 font-semibold cursor-pointer hover:underline" onClick={() => { onClickNotice(item.id, item.title, item.url) }}>{item.title}</p>
                        </>
                    ))}
                </>
            )}



            {columnistName && animated && !isHome
                ?
                <> <Skeleton className="w-full h-full object-cover" /> </> : <></>}

            {notices && isHome && (
                <>
                    <p className="text-[#191919] text-md font-metropolis font-bold mt-3  border-b-2 border-[#000000] w-[150px] ">Mais recentes</p>
                    {notices.slice(0, 6).map(item => (
                        <p key={item.id} className="text-[#191919] text-sm font-metropolis mt-5 font-semibold hover:cursor-pointer hover:underline" onClick={() => {
                            onClickNotice(item.id, item.title, item.url)
                        }}>
                            {item.title}
                        </p>
                    ))}
                </>
            )}


            <CardWrapper>
                <BoxText>
                    <p className="font-semibold text-[17px]"><span className="text-secondary">Opnião</span> DATAGRO</p>
                </BoxText>

                {animatedColumnist ?
                    <>

                        <Skeleton className="w-full h-[20px] mt-4" />
                        <Skeleton className="w-full h-[20px] mt-4" />
                        <Skeleton className="w-full h-[20px] mt-4" />
                    </>
                    : columnistArticles?.map((item) => (
                        <ul>
                            <li className="text-secondary  font-metropolis  font-semibold text-[15px]">{item.name}</li>
                            <li className="text-[#191919]  font-metropolis  font-semibold text-[14px] hover:underline cursor-pointer" onClick={() => { onClick(item.title, item.url, item.name, item.image, item.minibio, item.id, item.columnistId) }}>{item.title}</li>
                        </ul>
                    ))
                }
            </CardWrapper> */}
            {/* <MiniChartAside /> */}
            <QuotesTableMini />
            <ImagePrimary src={imagePrimary} />
            <ButtonPrice className="font-metropolis  font-semibold">Últimas cotações</ButtonPrice>
            <LatestQuotes />
            <ImageBanner src={imageGafff} />
        </AsideEl>
    )
}
