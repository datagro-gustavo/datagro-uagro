'use client'

import React from "react";

import styled from "styled-components";

const CardWrapper = styled.div`
    padding-left: 0.9rem;
    padding-top: 0.5rem;
    width: 190px;
    height: 150px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-left: 0.9rem;
    border: 3px solid #BDB4B0;

    
        p{
            color: #303030;
            font-size: 0.8rem;
        }
    

    @media screen and (max-width:920px){
        display: none;
        width:89%;
        height: 100px;

        p{
            color: #303030;
            font-size: 0.8rem;
        }
        
    }

`
const Button = styled.button`
    position: absolute;
    bottom: 5px;
    right: 9px;
    min-width: 80px;
    height: 24px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    border-radius: 5px;
    background-color: #8CB024;
    color: white;

    @media screen and (max-width:920px){
        font-size: 0.5rem;
        width: auto;
        border-radius: 3px;
        padding: 0.8rem;
        height: 3px;
        bottom: 2px;

    }

`
const Clean = styled.div`
    height: 0.9rem;

`

const CardBanner = ({ textPrimary, textSecondary, buttonName, href }) => {
    return (
        <CardWrapper>
            <p className="uppercase font-metropolis font-bold  text-[black]">{textPrimary}</p>
            <p id="textSecondary" className="font-metropolis text-sm text-[black]">{textSecondary}</p>
            <Clean />
            <Button className="font-metropolis text-md font-medium" onClick={() => window.open(href, "_blank")}>{buttonName}</Button>
        </CardWrapper>
    )
}

export default CardBanner