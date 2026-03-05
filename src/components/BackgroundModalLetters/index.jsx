'use client'

import React, { useContext } from "react";
import styled from "styled-components";

import { ModalContext } from "@/context/modal";


const CardWrapper = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    position: fixed;
    top: 0;
    background-color: #24232357;
    z-index: 999999999;
    width: 100%;
    height: 100vh;
`

const BackgroundModalLetters = () => {
    const { modalLetters, setModalLetters } = useContext(ModalContext)
    return (
        <CardWrapper onClick={() => setModalLetters(false)} show={modalLetters}>

        </CardWrapper>
    )
}

export default BackgroundModalLetters