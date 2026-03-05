'use client'

import React from "react";
import styled from "styled-components";

const Box = styled.div`
`
const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: first baseline;
    flex-direction: column;
    p{
        
        color: red;
    }
     @media screen and (max-width:920px){
        align-items: center;
        width: 100%;
    }

`
const Input = styled.input`
    width: 385px;
    height: 53px;
    border-radius: 4px;
    outline: none;
    padding-left: 0.9rem;
    margin-top: 2rem;

    border:${props => props.valid != false ? '1px solid #CCCCCC' : '1px solid red'} ;

    @media screen and (max-width:920px){

        width: 80%;
        
    }

`

const InputLogin = ({ onChange, valid }) => {
    return (
        <CardWrapper>

            <Input onChange={onChange} valid={valid} className="font-metropolis" placeholder="Digite seu email" />
            {valid == false ? <p className="font-metropolis text-md mt-[9px]">email inválido</p> : <></>}
        </CardWrapper>
    )
}

export default InputLogin