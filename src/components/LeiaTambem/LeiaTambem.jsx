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


export const LeiaTambem = ({scrolled}) => {
    const navigate = useNavigate()
    const config = getSessionConfig("leiaTambem");
    if (!config) return null;

    

    return (
        <section style={{marginTop:"2rem"}} className=" max-w-[1360px] mx-auto px-6">
			<Clean scrolled={scrolled} />

            <header className="mb-0">
                <h2 className="text-2xl md:text-3xl font-medium mb-6 ">{config.title}</h2>

            </header>

            {/* Container com o layout definido na config.flex */}
            <div className={config.flex}>
                {/* Mapeamos APENAS os cards desta sessão */}
                {config.qtd_cards.map((card) => (
                    <CardNews onClick={() => navigate("/news")}  key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
};

