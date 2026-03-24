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

    useEffect(() => {
        setMatter(id)
    }, [id, slug])

    useEffect(() => {
        getMatters()

        if (matters) {
            const data = matters.filter(item => item?.Id == id)
            if (data) {
                setDataMatter(data[0])
            }
        }

    }, [id])

    return (
        <section>
            <NavBar />
            <BackgroundModal />
            <div className="flex flex-row justify-center md:px-6 pb-5  ">
                <div className='md:px-0 px-5'>
                    <h1 className="text-[1.5rem] mt-6 h-[1.6rem] font-bold text-[#319e96] uppercase ">{dataMatter?.Name}</h1>
                    <h2 className="text-[0.9rem] md:max-w-[620px] mt-6 font-bold text-[#319e96] uppercase ">{dataMatter?.DisplayNames}</h2>

                    {animatedNotices ? <Skeleton /> : <></>}


                    {rowNotices?.map(item => {
                        return (
                            <CardMoreNotice title={item?.title} description={item?.description} image={item?.imageUrl} noticeId={item?.id} slug={item?.slug} />
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
                <Border className="hidden mr-3 ml-3 md:flex border border-r-0 ml-0 mr-0 border-slate-500 h-[auto]" />
                <Aside />
            </div>
            <Footer />
            <Sidebar />
            <ModalSign />
        </section>
    )
}

export default SectionNoticesMatters