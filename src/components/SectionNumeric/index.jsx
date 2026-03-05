'use client'

import React, { useState } from "react";
import styled from "styled-components";


const CardWrapper = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 54px;
    background-color: #ffffff;

    @media screen and (max-width:920px){
        padding-right: 2rem;
        height:60px;
        overflow-y:hidden;
        overflow-x: auto;
    }


`
const Box = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2rem;
    white-space: nowrap;  
    
    height:47px;

    #textPrimary{
        font-size: 1.6rem;
        color: #89B21B;
    }
    #textSecondary{
        position: relative;
        top: 3px;
        font-size: 0.8rem;
        color: #303030;
        margin-left: 0.4rem;
    }

    @media screen and (max-width:920px){

    #textPrimary{
        text-align: center;
        font-size: 1.3rem;
        color: #89B21B;
    }

    #textSecondary{
        position: relative;
        top: 3px;
        text-align: center;
        font-size: 0.8rem;
        color: #303030;
        margin-left: 0.4rem;
    }

        padding-top: 1.3rem;
        padding-bottom: 0.9rem;
    }

`
const Clean = styled.div`

    @media screen and (max-width:920px){
        margin-left:31rem;
    }

`

const SectionNumeric = () => {

    const [data] = useState([
        {
            textPrimary: "+45",
            textSecondary: "anos",
            count: 46
        },
        {
            textPrimary: "+300",
            textSecondary: "Colaboradores",
            count: 300
        },
        {
            textPrimary: "+50",
            textSecondary: "Paises clientes",
            count: 50
        },
        {
            textPrimary: "+15",
            textSecondary: "Commodities",
            count: 15
        },
        {
            textPrimary: "+42",
            textSecondary: "Eventos por ano",
            count: 42
        },
        {
            textPrimary: "+60K",
            textSecondary: "Participantes",
            count: 60
        }
    ])

    return (
        <CardWrapper>
            <Clean />
            {data?.map((item, index) => (
                <Box key={index}>
                    <p id="textPrimary" className="font-metropolis font-bold">
                        {item.textPrimary}
                    </p>
                    <p id="textSecondary" className=" md:w-[auto] md:font-metropolis-bold  ">{item.textSecondary}</p>
                </Box>
            ))}
        </CardWrapper>
    )
}

export default SectionNumeric;
