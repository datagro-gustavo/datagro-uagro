'use client'

import React, { useContext } from 'react'
import styled from 'styled-components'

/* CONTEXT */


const CardWrapper = styled.div`
    position: relative;
    width: 99%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
        top: -10px;
        width: 15px;
        position: absolute;
        right: 20px;
    }

`
const InputEl = styled.input`
    transition: all .2s;
    width: 90%;
    outline: none;
    margin-bottom: 0.9rem;
    border-bottom: 2px solid #dddd;
    background-color:${props => props.theme == true ? 'white' : '#120C18'} ;

    &:focus{
        border-bottom:  2px solid #8DC63F ;
    }

`

export const Input = ({ onChange, theme }) => {

    return (
        <CardWrapper>
            <InputEl theme={theme} onChange={onChange} className='font-metropolis' placeholder='Pesquise algo...' />
            <svg width="37" height="38" viewBox="0 0 37 38" fill="#ddd" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.03504 10.8662C4.7686 4.30233 11.1734 0.0192384 18.2837 0.000246966C25.9469 -0.0401072 32.7609 4.86844 35.1497 12.1499C37.5384 19.4314 34.9564 27.4225 28.7585 31.9294C22.5606 36.4363 14.1627 36.4296 7.97207 31.9128L2.45207 37.4328C1.89083 37.9933 0.981635 37.9933 0.420402 37.4328C-0.140134 36.8715 -0.140134 35.9623 0.420402 35.4011L5.7679 30.0536C0.772883 24.9933 -0.698517 17.4301 2.03504 10.8662ZM4.59791 23.3241C6.89307 28.8549 12.2956 32.4572 18.2837 32.4494V32.3728C26.411 32.3624 33.0086 25.799 33.0612 17.6719C33.069 11.6837 29.4667 6.28125 23.9359 3.98609C18.405 1.69093 12.036 2.95565 7.80176 7.18994C3.56748 11.4242 2.30275 17.7932 4.59791 23.3241Z" fill={theme ? 'black' : "white"} />
            </svg>
        </CardWrapper>
    )
}
