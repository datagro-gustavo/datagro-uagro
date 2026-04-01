'use client'

import React, { useContext, useEffect, useState } from 'react'

import styled from "styled-components"

/* COMPONENTS */

import { NavBar } from "@/components/NavBar/NavBar"
import CardMoreNotice from "@/components/CardMoreNotice"
import { Footer } from "@/components/Footer"
import { Aside } from "@/components/Aside"
import { Sidebar } from '../Sidebar'
import { ModalSign } from '../ModaSign'
import BackgroundModal from '../BackgroundModal'
import Skeleton from 'react-loading-skeleton'
import { MattersContext } from '@/context/matters'

const Border = styled.div`
        @media screen and (max-width:920px){
        display: none;
    }
`
const SectionNoticesMatters = ({ id, slug, page }) => {

    const [dataMatter, setDataMatter] = useState()


    const {
        rowNotices,
        hasMoreRows,
        loadMoreRowNotices,
        setMatter,
        animatedNotices,
        data,
        getMatters,
        matters
    } = useContext(MattersContext)


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

    useEffect(() => {
        setMatter(id)
    }, [id, slug])

    useEffect(() => {

        const data = matters.filter(item => slugify(item?.Name) == id)

        if (data) {
            setDataMatter(data[0])

        }

    }, [matters, id])




    return (
        <section>
            <NavBar />
            <BackgroundModal />
            <div className=" flex flex-col flex md:flex-row md:px-20 md:justify-center  ">
                <div className='md:px-0 px-5 md:max-w-[920px]'>

                    <div className='flex items-center gap-5 py-4'>
                        <div className='w-[5px] h-[79px] bg-[#98BF0E] rounded-[15px]' />
                        <div>
                            <h1 className="text-[1.5rem] mt-0 h-[1.31rem] font-bold text-[#000000]  ">{dataMatter?.Name}</h1>
                            <h2 className="text-[0.9rem] md:max-w-[420px] mt-6 font-medium text-[#000000]  ">{dataMatter?.DisplayNames}</h2>
                        </div>
                    </div>

                    {animatedNotices ? <Skeleton /> : <></>}


                    {rowNotices?.map(item => {
                        return (
                            <CardMoreNotice title={item?.title} publishDate={item?.publishDate} matters={item?.matters} markets={item?.markets} description={item?.description} image={item?.imageUrl} noticeId={item?.id} slug={item?.slug} />
                        )
                    })}

                    {hasMoreRows && rowNotices.length > 0 && (
                        <button
                            onClick={() => loadMoreRowNotices()}
                            className="cursor-pointer mt-9 mb-10 px-6 py-2 bg-[#319e96] text-white rounded-md hover:bg-secondary/90 transition-colors"
                        >
                            {"Ver mais notícias"}
                        </button>
                    )}


                </div>
                {rowNotices.length == 0 ? <div className='w-[440px]' /> : ''}

                <div className='ml-30 flex'>
                    <Border className="hidden mr-15 ml-3 md:flex border border-r-0 ml-0 mr-0 border-slate-500 h-[auto]" />
                    <Aside />
                </div>
            </div>
            <Footer />
            <Sidebar />
            <ModalSign />
        </section>
    )
}

export default SectionNoticesMatters