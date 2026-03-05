'use client'

import React, { useContext } from "react";

import styled from "styled-components";

import { ModalContext } from "@/context/modal";
import { SidebarContext } from "@/context/sidebar";

const CardWrapper = styled.div`
    display: ${props => props.show !== 'false' ? 'block' : 'none'};
    position: fixed;
    top: 0;
    background-color: #24232357;
    z-index: 999999999;
    width: 100%;
    height: 100vh;
`

const BackgroundModal = () => {
    const { modalLogin, setModalLogin } = useContext(ModalContext)
    const { sidebar } = useContext(SidebarContext)
    return (
        <CardWrapper onClick={() => setModalLogin('false')} show={modalLogin || sidebar}>

        </CardWrapper>
    )
}

export default BackgroundModal