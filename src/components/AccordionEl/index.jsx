'use client'

import { ThemeContext } from "@/context/theme";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import sidebar from '../../constants/sidebar'
import { FaMailBulk } from 'react-icons/fa'

import Image from "next/image";
import { MattersContext } from "@/context/matters";
import { useRouter } from "next/navigation";

const AccordionContainer = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
  
  overflow: hidden;
`;
const AccordionItem = styled.div`
  border-bottom: 1px solid #ccc;
`;
const AccordionHeader = styled.div`
  position: relative;
  padding: 1rem;
 
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
    filter:${props => props.theme == true ? ` brightness(0) invert(0)` : `brightness(0) invert(1)`}  ;

  }

  svg{
    position: absolute;
    right: 35px;
    filter:${props => props.theme == true ? ` brightness(0) invert(0)` : `brightness(0) invert(1)`}  ;

  }

`;
const AccordionBody = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  overflow: hidden;
  transition:  0.1s ease-in-out;
  padding-left: ${({ isOpen }) => (isOpen ? "1rem" : "0")};
  background-color: ${props => props.theme == true ? '#fff' : '#120C18'} ;

  span{
    transition: all .2s ease-in-out;
    color: ${props => props.theme == true ? 'black' : 'white'} ;

    cursor: pointer;
    font-weight: bold;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }

  span:hover{
    color:#8DC63F ;
  }

`;


export const AccordionEl = () => {
  const { theme } = useContext(ThemeContext)
  const [openIndex, setOpenIndex] = useState(null);
  const {matters} = useContext(MattersContext)
  const router = useRouter()

      
	const slugify = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espaços -> hífen
    .replace(/[^\w-]+/g, "") // remove caracteres especiais
    .replace(/--+/g, "-") // evita múltiplos hífens
    .trim();
    };

  const onClickGoToCategory = (item) => {
    router.push(`${slugify(item?.Name.toLowerCase())}`)
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContainer>
      {matters?.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader className="hover:underline hover:text-[#139d4a]" onClick={() => onClickGoToCategory(item)}>
            {item.Name}
          </AccordionHeader>
          
          <AccordionBody theme={theme} isOpen={openIndex === index && item?.items}>
            {item?.data?.map((item, index) => {
              return (
                <span key={index} className="font-metropolis" onClick={() => {onClickGoToCategory(item)} }> {item.Name} </span>
              )
            })}
          </AccordionBody>
        </AccordionItem>
      ))}
      
      <AccordionItem>
        <AccordionHeader className="hover:underline hover:text-[#139d4a]" theme={theme} onClick={() => toggleAccordion('contact')}>
          Contato
        </AccordionHeader>
        <AccordionBody theme={theme} isOpen={openIndex === 'contact'}>
          <span onClick={() => window.location.href = 'mailto:contato@uagro.com.br'}>contato@uagro.com.br</span>
        </AccordionBody>
      </AccordionItem>
    </AccordionContainer>
  );
};
