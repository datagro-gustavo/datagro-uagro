'use client'

import React, { use, useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";


import api from "@/services/api";
import { NewsContext } from "@/context/news";

const CardWrapper = styled.div`
  opacity: ${props => (props.scrolled ? 1 : 0)};
  transform: ${props => (props.scrolled ? 'translateY(40px)' : 'translateY(-20px)')};
  transition: all 0.4s ease;
  
  position: fixed;
  top: ${props => (props.scrolled ? '30%' : '0%')};
  left: 0.3%;
  z-index: 99999999;
  pointer-events: ${props => (props.scrolled ? 'auto' : 'none')}; 

  @media screen and (max-width: 920px) {
    left: 1.5%;
  }
`;

const LiEl = styled.li`
    display: flex;
    cursor: pointer;
    transition: all .3s ease-in-out;
    align-items: center;
    width: 8px;
    height: 30.08px;
    margin-bottom: 0.2rem;
    background-color: ${props => props.color};
    p{
        display: none;
    }

    &:hover{
            box-shadow: 0 0 1px ${props => props.hoverColor};
            background-color: ${props => props.hoverColor};
            padding-left: 1.3rem;
            padding-right: 0.5rem;
            min-width: 80px;
            width: auto;

        p{
            color: white;
            display: block;
        }
    }
`

const Link = () => {
    const router = useRouter()
    const [scrolled, setScrolled] = useState('false');
    const handleScroll = () => setScrolled(window.scrollY >= 280);

    const { setCurrentMarketId } = useContext(NewsContext)

    const [data, setData] = useState([])

    const get = async () => {
        const response = await api.get("api/Markets/list?lang=pt-br")
        if (response.status == 200) {
            const data = response.data;
            setData(data.filter(item => item.color !== null))
        }
    }

    const { setLinkColor } = useContext(NewsContext)


    const [links] = useState([
        {
            name: "Algodão",
            color: "#90C1DF",
            hoverColor: "#68a0c3",
            link: "algodao"
        },
        {
            name: "Açúcar e Etanol",
            color: "#35CA35",
            hoverColor: "#27b227",
            link: "acucar-e-etanol"

        },
        {
            name: "Biodiesel",
            color: "#9AD379",
            hoverColor: "#84c060",
            link: "biodisel"

        },
        {
            name: "Borracha",
            color: "#316380",
            hoverColor: "#285873",
            link: "borracha"

        },
        {
            name: "Café",
            color: "#9B650C",
            hoverColor: "#8c5b0c",
            link: "cafe"

        },
        {
            name: "Citrus",
            color: "#F8C29A",
            hoverColor: "#f3a264",
            link: "citrus"
        },
        {
            name: "Fertilizantes e Proteção de Cultivos",
            color: "#316380",
            hoverColor: "#214961",
            link: "fertilizantes"
        },
        {
            name: "Milho",
            color: "#EBB52E",
            hoverColor: "#d8a627",
            link: "milho"
        },
        {
            name: "Pecuária",
            color: "#EB7569",
            hoverColor: "#ee5948",
            link: "pecuaria"
        },
        {
            name: "Petróleo e Derivados",
            color: "#6E9381",
            hoverColor: "#618071",
            link: "petroleo"
        },
        {
            name: "Soja",
            color: "#9183B6",
            hoverColor: "#7d63c0",
            link: "soja"
        },
        {
            name: "Trigo",
            color: "#B7AC7B",
            hoverColor: "#b2a04f",
            link: "trigo"
        }
    ])
    const handleRedirectToNewsPage = (title, href) => {
        const link = String(title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        // navigate(`/news/${link}`, { state: { url: href } })

    }

    const handleRedirectToLink = (title, hoverColor, color, marketId) => {
        const link = String(title || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
        setCurrentMarketId(marketId)
        setLinkColor({ hoverColor: hoverColor, color: color })
        router.push(`/cultura/${marketId}/${link}`)
    }

    useEffect(() => {
        get()
    }, [])


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (

        <CardWrapper scrolled={scrolled} className="hidden sm:block">

            <ul>
                {data?.map(item => {
                    return (
                        <LiEl key={item?.id} onClick={() => handleRedirectToLink(item?.title, item?.color, item?.color, item?.id)} className="font-metropolis text-[18px] " hoverColor={item?.color} color={item?.color}><p>{item?.title}</p></LiEl>
                    )
                })}
            </ul>

        </CardWrapper>

    )
}

export default Link