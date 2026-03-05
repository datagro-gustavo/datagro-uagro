'use client'

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


import { getSessionConfig } from "@/utils/getSessionConfig";
import CardNews from "../CardNews";

const Clean = styled.div`
	height:${props => props.scrolled ? "13.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}

`;


const RowNoticeSection = ({ scrolled, name }) => {
    const navigate = useNavigate()
    const config = getSessionConfig("rowsnoticesection");
    if (!config) return null;



    return (
        <section style={{ marginBottom: "0" }} className=" xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-6 py-7">
            <Clean scrolled={scrolled} />
        
            <header className="mb-0">
                {!name ? <></> : <h2 className="text-2xl md:text-3xl font-medium mb-6 ">{config.title}</h2>}

            </header>

            {/* Container com o layout definido na config.flex */}
            <div className={config.flex}>
                {/* Mapeamos APENAS os cards desta sessão */}
                {config.qtd_cards.map((card) => (
                    <CardNews onClick={() => navigate("/news")} key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
};

export default RowNoticeSection;
