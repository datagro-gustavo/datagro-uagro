'use client'
import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    position: relative;


    svg{
        position: absolute;
        right: 15px;
        top: 7px;
    }

`
const InputEl = styled.input`
    color:black;
    border:1px solid #575757;
    height: 30px;
    outline: none;
    padding-left: 0.62rem;
    border-radius: 5px;
`
const Input = ({ placeholder,onChange }) => {
    return (

        <CardWrapper>
            <InputEl onChange={onChange} className="font-metropolis" placeholder={placeholder} />
            <svg width="15" height="15" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.32031 7.29166L10.3828 9.16666" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.1665 4.58334C9.1665 2.51227 7.3197 0.833336 5.0415 0.833336C2.76333 0.833336 0.916504 2.51227 0.916504 4.58334C0.916504 6.65442 2.76333 8.33334 5.0415 8.33334C7.3197 8.33334 9.1665 6.65442 9.1665 4.58334Z" stroke="#000000" stroke-linejoin="round" />
            </svg>

        </CardWrapper>

    )
}

export default Input