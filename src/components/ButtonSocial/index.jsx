'use client'

import Image from "next/image";
import React from "react";

import styled from "styled-components";

const Button = styled.button`
    transition: all .2s ease-in-out;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 40px;
    border:${props => props.border != 'false' ? '1px solid #000000' : 'none'} ;
    border-radius: 8px;
    margin-bottom: 0.61rem;
    padding-left: 1rem;
    font-size: 0.9rem;

    img{
        left: 9px;
        position: absolute;
        margin-left:0.5rem;
    }

    &:hover{
        border:1px solid black;
    }

`

const ButtonSocial = ({ name, img, border }) => {
    return (
        <Button border={border}>
            <Image  src={img} alt={name} width={17} height={17}/>
            {name}
        </Button>
    )
}

export default ButtonSocial