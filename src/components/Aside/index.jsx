'use client'

import React, { useState, useContext, use } from "react";
import styled from "styled-components";
// import { useLocation, useNavigate } from "react-router-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bannerSecondary from '../../assets/banners/banner.png'

import Skeleton from "react-loading-skeleton";

/* COMPONENTS */
import { ColumnContext } from "@/context/column";
import { ThemeContext } from "@/context/theme";
import { NewsContext } from "@/context/news";
import { Climate } from "../Climate";

import Menu from "../Menu";
import { LatestQuotes } from "../LatestQuotes";
import { ToastContainer } from "react-toastify";

/* IMAGES */
import imagePrimary from '../../assets/banners/image 5.png'
import imageGafff from '../../assets/banners/banner-datagro.png'
import { toast } from "react-toastify";
import { QuadrosContext } from "@/context/quadros";
import { RenderTables } from "../MainChart/renderTables";


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
    display: flex;
    width: 320px;
    margin: 0 auto;
    flex-direction: column;

    margin-top: 0.5rem;
    margin-bottom: 1rem;
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

export const Aside = () => {

    const router = useRouter()

    const [idPlaylist, setIdPlaylist] = useState("4hDAPlV5AvNKbyjhRnn3zs");
    const { theme } = useContext(ThemeContext)
    const { columnistHistory, columnistName, columnist, columnistArticles, setColumnistName, setColumnistImage, setColumnistMiniBio, setColumnistId, animated, setAnimated, animatedColumnist } = useContext(ColumnContext)
    const { notices, pageType } = useContext(NewsContext)
    const { quadrosIntegra } = useContext(QuadrosContext)

    const [name, setName] = useState()
    const [mail, setMail] = useState()
    const [company, setCompany] = useState()
    const [post, setPost] = useState()

    const handleButton = () => {
        if (!name) {
            return toast.error("Informe seu nome", {
                autoClose: 1500
            })
        }
        if (!mail) {
            return toast.error("Informe seu email", {
                autoClose: 1500
            })
        }

        if (!company) {
            return toast.error("Informe uma empresa", {
                autoClose: 1500
            })
        }
        if (!post) {
            return toast.error("Informe seu cargo", {
                autoClose: 1500
            })
        }
    }


    // const location = useLocation()
    // const isHome = location.pathname === "/"
    // const isNews = location.pathname.startsWith("/news");

    const onClick = (title, href, author, image, miniBio, id, columnistId) => {
        // setAnimated(true)
        const link = String(title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        // setColumnistName(author)
        // setColumnistImage(image)
        // setColumnistMiniBio(miniBio)
        // setColumnistId(columnistId)
        router.push(`/artigo/${id}/${columnistId}/${link}`, { state: { url: href } })
    }

    const handleForm = (e) => {
        e.preventDefault()

        if (!name) {
            return toast.error("Informe seu nome", { autoClose: 1500 })
        }
        if (!mail) {
            return toast.error("Informe seu email", { autoClose: 1500 })
        }
        if (!company) {
            return toast.error("Informe uma empresa", { autoClose: 1500 })
        }
        if (!post) {
            return toast.error("Informe seu cargo", { autoClose: 1500 })
        }

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

        // navigate(`/news/${idNoticia}/${link}`, { state: { url: href } })
    }

    return (
        <AsideEl className="hidden md:flex flex-col w-[]">

            <div className="flex flex-col  items-center">
                <Climate />

                {!animated && columnistHistory && columnistName && (
                    <>

                        <p className="text-[#191919]  font-metropolis font-bold mt-1">Mais artigos - {columnistName}</p>
                        {columnistHistory?.slice(0, 6).map((item) => (
                            <>
                                <p key={item?.id} className="text-[#191919] text-sm font-metropolis mt-5 font-semibold cursor-pointer hover:underline" onClick={() => { onClickNotice(item.id, item.title, item.url) }}>{item.title}</p>
                            </>
                        ))}
                    </>
                )}



                {columnistName && animated
                    ?
                    <>
                        <Skeleton className="w-full h-full object-cover" />

                    </>

                    : <></>}
{/* 
                <CardWrapper>
                    <BoxText>
                        <p className="font-semibold text-[17px] "><span className="text-secondary">Opnião</span> Uagro</p>
                    </BoxText>

                    {animatedColumnist ?
                        <>

                            <Skeleton className="w-full h-[20px] mt-4" />
                            <Skeleton className="w-full h-[20px] mt-4" />
                            <Skeleton className="w-full h-[20px] mt-4" />
                        </>
                        :

                        columnistArticles?.map((item) => (
                            <ul key={item?.id}>
                                <li className="text-secondary  font-metropolis  font-semibold text-[15px]">{item.name}</li>
                                <li className="text-[#191919]  font-metropolis  font-semibold text-[14px] hover:underline cursor-pointer" onClick={() => { onClick(item.title, item.url, item.name, item.image, item.minibio, item.id, item.columnistId) }}>{item.title}</li>
                            </ul>
                        ))

                    }


                </CardWrapper> */}



                <Image alt="banner datagro"  onClick={() => window.open("http://datagro.com/","blank")}  width={300} height={300} className="w-[350px] mx-auto mt-5 mb-7" src={imagePrimary} />

                

                <div className="mx-auto">
                    <div className="mt-6 mb-6 w-full  ">
                        <h1 className="text-[#319e96] font-semibold text-lg "> Newsletter</h1>
                        <span className="text-sm font-semibold">Receba diariamente as principais notícias do agronegócio</span>
                    </div>

                    <div className="mb-6 flex-col w-full jusntify-center items-center">
                        <form onSubmit={handleForm} className="flex flex-col gap-3">
                            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Nome" className="px-3 py-1 border border-gray-300 rounded-md" />
                            <input type="email" onChange={(e) => setMail(e.target.value)} placeholder="Email" className="px-3 py-1 border border-gray-300 rounded-md" />
                            <input type="text" onChange={(e) => setCompany(e.target.value)} placeholder="Empresa" className="px-3 py-1 border border-gray-300 rounded-md" />
                            <input type="text" onChange={(e) => setPost(e.target.value)} placeholder="Cargo" className="px-3 py-1 border border-gray-300 rounded-md" />
                            <button type="submit" className="cursor-pointer mt-2.5 font-metropolis  text-white bg-[#7fb954] p-2 rounded-md w-full text-sm">Cadastrar</button>

                        </form>
                    </div>
                </div>

                <RenderTables dados={Object.values(quadrosIntegra)[0]} />
                {/* <Image alt="banner curso datagro" src={bannerSecondary} className="mt-10 w-full" width={500} height={300} /> */}
            </div>


            {/* {pageType == "culture" ? <Menu /> : <></>} */}

            {/* <Button className="font-metropolis font-medium text-lg ">Novo Episódio</Button> */}
            {/* <Spotify playlistId={idPlaylist} /> */}





            {/* {notices && (
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
            )} */}


        </AsideEl>
    )
}
