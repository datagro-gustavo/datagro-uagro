'use client'

import React from "react";

import styled from "styled-components";

import CardBanner from "../CardBanner";
import { getInstituctionalLinks } from "@/utils/getLinksInstitucionais";



import banner from '../../assets/banners/bannerSecondary.png'
import bannerMobile from '../../assets/banners/bannerDatagroMobile.png'


const CardWrapper = styled.section`
    display: flex;
    width: 100%;
    height: 230px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(${banner});

    @media screen and (max-width:920px){

        background-image: url(${bannerMobile}) ;
        height: 130px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

    }
`;

const BoxCard = styled.div`
    display: flex;
    position: absolute;
    right: 15px;
    top: 60px;

    @media screen and (max-width:920px){
        top: 7px;
        display: grid;
        grid-template-columns: auto auto;
        gap: 15px;
        
    }
`

const CardPrimary = styled.div`
    margin-top: 3em;
    padding-left: 0.9rem;
    width: 40%;

    @media screen and (max-width:920px){
        padding-left: 1.3rem;
        font-size: 0.5rem;
    }
`

const BannerSection = ({ name }) => {
    const config = getInstituctionalLinks();

    return (
        <>
            <CardWrapper>

                <CardPrimary>
                    <p className="text-[#FFFFFF] font-metropolis font-bold text-[11px]  md:md:text-[24px] mb-2 md:mb-4 "><p className="text-[11px]  md:text-[16px] mb-1">CONSULTORIA INDEPENDENTE</p> <b>AGROINDUSTRIAL</b></p>
                    <p className="text-[#FFFFFF] font-metropolis font-medium text-[7px] md:text-[18px] ">Análises, dados primários e notícias,<br />
                        sobre as principais commodities agrícolas mundiais.</p>
                </CardPrimary>

                <BoxCard>
                    {config.map((item, id) => (
                        <CardBanner key={id} buttonName={item.button} textPrimary={item.name} textSecondary={item.description} href={item.href} />
                    ))}
                </BoxCard>

            </CardWrapper>

            <div className="sm:hidden md:hidden grid grid-cols-4 gap-2 px-4 py-3">
                 {config.map((item, id) => (
                        <CardBannerMobile key={id} buttonName={item.button} />
                    ))}
            </div>

        </>
    )
}

export default BannerSection