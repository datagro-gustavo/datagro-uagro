'use client'

import React, { useContext, useEffect } from 'react'

import styled from "styled-components"

/* COMPONENTS */

import { NavBar } from "@/components/NavBar/NavBar"
import CardMoreNotice from "@/components/CardMoreNotice"
import { Footer } from "@/components/Footer"
import { BannersContext } from '@/context/banners'
import { Aside } from "@/components/Aside"
import { TagsContext } from '@/context/tags'
import { Sidebar } from '../Sidebar'
import { ModalSign } from '../ModaSign'
import BackgroundModal from '../BackgroundModal'
import Skeleton from 'react-loading-skeleton'
import { TagsAside } from '../TagsAside'
import { MattersContext } from '@/context/matters'

const Border = styled.div`
        @media screen and (max-width:920px){
        display: none;
    }
`
const SectionNoticesTags = ({ slug, page }) => {
    const { get, getBannerPositionInfo } = useContext(BannersContext);
    const bannerPosition = getBannerPositionInfo(7, "tags", slug);

    useEffect(() => {
        if (!slug) return;
        get(7, "tags", slug);
    }, [slug, get]);



    const {
        rowNotices,
        hasMoreRows,
        loadMoreRowNotices,
        setTagId,
        animatedNotices,
        data,
        tagName,
        nameTag,
        setTagSlug
    } = useContext(TagsContext)

    useEffect(() => {
        setTagSlug(slug)
    }, [slug])



    return (
        <section>
            <NavBar />
            <BackgroundModal />
            <div className=" flex flex-col flex md:flex-row md:px-20 md:justify-center  ">
                <div className='md:px-0 px-5 md:max-w-[920px]'>
                    <h1 className="text-[1.3rem] mt-6 font-bold text-[#98BF0E] uppercase ">{nameTag}</h1>


                    {bannerPosition?.banners?.map((item) => (
                        <img
                            className='mt-9'
                            key={item.id}
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ width: "100%", maxWidth: "1600px" }}
                        />
                    ))}



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
                <Border className="hidden md:flex border border-r-0 ml-5 mr-5 border-slate-500 h-[auto]" />
                <TagsAside tags={slug} />
            </div>
            <Footer />
            <Sidebar />
            <ModalSign />
        </section>
    )
}

export default SectionNoticesTags