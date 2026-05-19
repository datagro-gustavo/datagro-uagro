'use client'

import { ThemeContext } from "@/context/theme";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import sidebar from '../../constants/sidebar'
import { FaMailBulk } from 'react-icons/fa'
import Image from "next/image";
import { MattersContext } from "@/context/matters";
import { useRouter } from "next/navigation";
import { SidebarContext } from "@/context/sidebar";

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
  justify-content: space-between;

  img {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
    filter: ${props => props.theme == true ? ` brightness(0) invert(0)` : `brightness(0) invert(1)`};
  }

  svg {
    filter: ${props => props.theme == true ? ` brightness(0) invert(0)` : `brightness(0) invert(1)`};
    transition: transform 0.2s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const AccordionBody = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.25s ease-in-out, padding 0.25s ease-in-out;
  padding-left: ${({ isOpen }) => (isOpen ? "1.5rem" : "0")};
  padding-bottom: ${({ isOpen }) => (isOpen ? "0rem" : "0")};
  background-color: ${props => props.theme == true ? '#fff' : '#120C18'};

  span {
    transition: all .2s ease-in-out;
    color: ${props => props.theme == true ? 'black' : 'white'};
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }

  span:hover {
    color: #8DC63F;
  }
`;

export const AccordionEl = () => {
  const { theme } = useContext(ThemeContext)
  const [openIndex, setOpenIndex] = useState(null);
  const { matters } = useContext(MattersContext)
  const router = useRouter()
  const {setSidebar} = useContext(SidebarContext)

  const slugify = (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();
  };

  const onClickGoToCategory = (e, item) => {
    setSidebar("false")
    e.stopPropagation(); // evita disparar o toggle
    router.push(`/${slugify(item?.Name)}`)
  };

  const onClickGoToTag = (tag) => {
    setSidebar("false")
    const slug = tag?.slug || slugify(tag?.name);
    router.push(`/assunto/${slug}`)
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContainer>
      {matters?.map((item, index) => {
        const isOpen = openIndex === index;
        const hasTags = Array.isArray(item?.tags) && item.tags.length > 0;

        return (
          <AccordionItem key={item.Id ?? index}>
            <AccordionHeader
              theme={theme}
              isOpen={isOpen}
              onClick={() => toggleAccordion(index)}
            >
              <span
                className="hover:underline hover:text-[#139d4a]"
                onClick={(e) => onClickGoToCategory(e, item)}
              >
                {item.Name}
              </span>

              {hasTags && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </AccordionHeader>

            {hasTags && (
              <AccordionBody theme={theme} isOpen={isOpen}>
                {item.tags.map((tag) => (
                  <span

                    key={tag.id}
                    className="font-metropolis"
                    onClick={() => onClickGoToTag(tag)}
                  >
                    {tag.name}
                  </span>
                ))}
              </AccordionBody>
            )}
          </AccordionItem>
        );
      })}

      <AccordionItem>
        <AccordionHeader
          className="hover:underline hover:text-[#139d4a]"
          theme={theme}
          isOpen={openIndex === 'contact'}
          onClick={() => toggleAccordion('contact')}
        >
          <span>Contato</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </AccordionHeader>
        <AccordionBody theme={theme} isOpen={openIndex === 'contact'}>
          <span onClick={() => window.location.href = 'mailto:contato@uagro.com.br'}>
            contato@uagro.com.br
          </span>
        </AccordionBody>
      </AccordionItem>
    </AccordionContainer>
  );
};