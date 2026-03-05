'use client'

import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2.5rem;
    align-items: center;
    transition: all .2s;
    position: fixed;
    height: 200px;
    width: 100%;
    background-color: #303030;
    bottom: ${props => props.open ? 0 : '-320px'} ;

    @media screen and (max-width:920px){

        height: 150px;
        
    }

`
const Input = styled.input`
    width: 328px;
    outline: none;
    border: none;
    padding-left: 0.5rem;
    height: 32px;
`
const Box = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
`

const BottomModal = () => {
    return (
        <CardWrapper open={false}>

        </CardWrapper>
    )
}

export default BottomModal