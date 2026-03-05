'use client'

import React from "react";

import styled from "styled-components";

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 385px;
    height: 36px;
    background-color:${props => props.valid ? '#000000' : '#EFEFEF' } ;
    border: 2px solid #767676;
    color:${props => props.valid ? '#FFFFFF' : '#999999' } ;
    margin-top: 1rem;
    border-radius: 8px;
    
    @media screen and (max-width:920px){

        width: 80%;
        
    }

`

const ButtonSign = ({ name,valid,onClick }) => {
    return (
        <Button onClick={onClick} valid={valid}>{name}</Button>
    )
}

export default ButtonSign