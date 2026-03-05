'use client'

import React, { useCallback, useContext, useRef, useState,useEffect } from "react";
import styled from "styled-components";

/* IMAGES */
import companyIcon from '../../assets/logos/logo-uagro.png'
import companyIconWhite from '../../assets/logos/datagro-news.png'
import facebookIcon from '../../assets/icons/Facebook.png'
import instagramIcon from '../../assets/icons/instagram.png'
import twitterIcon from '../../assets/icons/Twitter (1).png'
import youtubeIcon from '../../assets/icons/Youtube.png'

/* COMPONENTS */

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

/* CONTEXT */
import { SearchContext } from "@/context/search";
import { ThemeContext } from "@/context/theme";
import { SidebarContext } from "@/context/sidebar";
import { AccordionEl } from "../AccordionEl";
import { Input } from "../Input";
import { NoticeSidebar } from "../NoticeSidebar";
import Image from "next/image";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const SidebarEl = styled.aside`
    position: fixed;
    transition: all .2s ease-in-out;
    top: 0;
    left: ${props => props.sidebar == 'false' ? "-3000px" : 0} ;
    width: 320px;
    height: 100vh;
    color: ${props => props.theme == true ? 'black' : 'white !important'};
    z-index: 99999px;
    background-color:${props => props.theme == true ? 'white' : '#120C18'} ;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: 0 0 5px #434141;
    z-index: 9999999999999;

`
const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100px;
    img{
        object-fit: contain;
        width: 155px;
    }

    svg{
        cursor: pointer;
        top: 22px;
        right: 22px;
        position: absolute;
        filter:${props => props.theme == true ? ` brightness(0) invert(0)` : `brightness(0) invert(1)`}  ;

    }

`
const Body = styled.div`
    overflow-y: auto;
    height: 70vh;
`
const Footer = styled.div`
    display: flex;
    padding-top: 1rem;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 120px;
    align-items: center;
    position: absolute;
    bottom:0;
    background-color:${props => props.theme == true ? 'white' : '#120C18'} ;
    box-shadow: 0 0 5px #bfbcbc72;

    img{
        filter:${props => props.theme == true ? ` brightness(0) invert(0)` : `brightness(0) invert(1)`}  ;
        margin-left: 0.9rem;
    }

`
const SkeletonAnimation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;


`
const CleanTop = styled.div`
    height: 4rem;
`
const Clean = styled.div`
    height: 1.9rem;
`
const Box = styled.div`
    margin-top: 1rem;
`
const Row = styled.div`
    display: flex;
    width: 100%;
    padding-left: 4.3rem;

    img{
        width: 22px;
    }

`
const RowLanguage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 220px;
    height: 40px;
    border-radius: 8px;
    margin-bottom: 1.4rem;
    border: 2px solid #E2E4E9;
`
const BoxLanguage = styled.div`
    transition: all .2s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-right: 1rem;
    padding-left: 0.9rem;
    background-color: ${props => props.select ? '#e2e4e9d8' : ''} ;
    border-radius: 8px;
    height: 100%;

    svg{
        width: 20px;
        height: 20px;
        object-fit: contain;
        margin-right: 0.4rem;
    }

    p{
        font-size: 0.8rem;
    }

`
const Button = styled.button`
    width: 90px;
    border-radius: 5px;
    color: white;
    padding: 0.1rem;
    background-color: #303030;
`

export const Sidebar = () => {

    const [select, setSelect] = useState(2)
    const [dataSocialIcons] = useState([
        {
            id: 1
        },
        {
            id: 2
        }
    ])


    const { data, get, animation } = useContext(SearchContext)

    const {
        sidebar,
        setSidebar,
    } = useContext(SidebarContext)

    const { theme } = useContext(ThemeContext)
    const ref = useRef(null);

    const close = useCallback(() => setSidebar('false'), [sidebar]);

    
useEffect(() => {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [close]);

    return (
        <SidebarEl ref={ref} theme={theme} sidebar={sidebar}>
            <Header theme={theme}>
                {theme
                    ?

                    <Image width={600} height={600} src={companyIcon} alt="company Icon" />
                    :
                    <Image width={600} height={600} src={companyIconWhite} alt="company Icon White" />
                }
                <svg onClick={() => setSidebar('false')} width="15" height="15" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.29709 1.29709C3.02658 -0.432362 5.83058 -0.432362 7.56007 1.29709L31.0001 24.7372L54.4401 1.29709C56.1694 -0.432362 58.9736 -0.432362 60.703 1.29709C62.4323 3.02658 62.4323 5.83058 60.703 7.56007L37.263 31.0001L60.703 54.4401C62.4323 56.1694 62.4323 58.9736 60.703 60.703C58.9736 62.4323 56.1694 62.4323 54.4401 60.703L31.0001 37.263L7.56007 60.703C5.83058 62.4323 3.02658 62.4323 1.29709 60.703C-0.432362 58.9736 -0.432362 56.1694 1.29709 54.4401L24.7372 31.0001L1.29709 7.56007C-0.432362 5.83058 -0.432362 3.02658 1.29709 1.29709Z" fill="#404040" />
                </svg>
                <Box>

                </Box>
            </Header>
            <Body>
                <Input theme={theme} onChange={(e) => get(e.target.value)} className="font-metropolis" placeholder="Pesquise por algo.." />

                {animation

                    ?
                    <>
                        <SkeletonAnimation>
                            <Skeleton style={{ width: "80px", height: "80px", borderRadius: "100%", margin: "0 auto" }} />
                            <Skeleton style={{ width: "90px", height: "20px", margin: "15px auto" }} />
                            <Skeleton style={{ width: "90px", height: "20px", margin: "2px auto" }} />

                        </SkeletonAnimation>

                        <SkeletonAnimation>
                            <Skeleton style={{ width: "80px", height: "80px", borderRadius: "100%", margin: "0 auto" }} />
                            <Skeleton style={{ width: "90px", height: "20px", margin: "15px auto" }} />
                            <Skeleton style={{ width: "90px", height: "20px", margin: "2px auto" }} />
                        </SkeletonAnimation>


                    </>
                    :
                    data?.map(item => {
                        return (
                            <div key={item?.id} >
                                <CleanTop />
                                <NoticeSidebar data={item} />
                            </div>

                        )
                    })

                }

                {data.length > 0

                    ?
                    <></>
                    :
                    <AccordionEl />
                }

                <Clean />
            </Body>
            <Footer theme={theme} >
                {/* <RowLanguage>
                    {dataSocialIcons?.map(item => {
                        return (
                            <BoxLanguage key={item?.id} onClick={() => setSelect(item?.id)} select={item?.id == select ? true : false}  >
                                {item?.id == 1

                                    ?
                                    <svg width="47" height="43" viewBox="0 0 47 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_5_807)">
                                            <path d="M23.5 43C36.4787 43 47 33.3741 47 21.5C47 9.62588 36.4787 0 23.5 0C10.5213 0 0 9.62588 0 21.5C0 33.3741 10.5213 43 23.5 43Z" fill="#F0F0F0" />
                                            <path d="M22.4783 21.5H47C47 19.5595 46.7172 17.6796 46.1904 15.8913H22.4783V21.5Z" fill="#D80027" />
                                            <path d="M22.4783 10.2826H43.5508C42.1122 8.13498 40.2729 6.23668 38.1284 4.6739H22.4783V10.2826Z" fill="#D80027" />
                                            <path d="M23.5 43C29.0306 43 34.1141 41.2511 38.1283 38.3261H8.87158C12.8859 41.2511 17.9693 43 23.5 43Z" fill="#D80027" />
                                            <path d="M3.44919 32.7174H43.5508C44.7057 30.9933 45.6014 29.1086 46.1905 27.1086H0.80957C1.39863 29.1086 2.29429 30.9933 3.44919 32.7174V32.7174Z" fill="#D80027" />
                                            <path d="M10.8856 3.35753H13.0272L11.0352 4.68154L11.7961 6.8239L9.80418 5.49988L7.81228 6.8239L8.46955 4.97313C6.71568 6.30975 5.17845 7.87572 3.91165 9.62058H4.59783L3.32984 10.4634C3.13229 10.7649 2.94282 11.0712 2.76125 11.382L3.36674 13.0869L2.23709 12.336C1.95628 12.8803 1.69944 13.4369 1.46857 14.0051L2.13565 15.8836H4.59783L2.60584 17.2076L3.36674 19.35L1.37484 18.026L0.181666 18.8191C0.0622383 19.6974 0 20.592 0 21.5H23.5C23.5 9.62595 23.5 8.2261 23.5 0C18.8576 0 14.5301 1.23205 10.8856 3.35753V3.35753ZM11.7961 19.35L9.80418 18.026L7.81228 19.35L8.57319 17.2076L6.58119 15.8836H9.04337L9.80418 13.7413L10.565 15.8836H13.0272L11.0352 17.2076L11.7961 19.35ZM11.0352 10.9446L11.7961 13.0869L9.80418 11.7629L7.81228 13.0869L8.57319 10.9446L6.58119 9.62058H9.04337L9.80418 7.47822L10.565 9.62058H13.0272L11.0352 10.9446ZM20.2254 19.35L18.2335 18.026L16.2416 19.35L17.0025 17.2076L15.0105 15.8836H17.4727L18.2335 13.7413L18.9943 15.8836H21.4565L19.4645 17.2076L20.2254 19.35ZM19.4645 10.9446L20.2254 13.0869L18.2335 11.7629L16.2416 13.0869L17.0025 10.9446L15.0105 9.62058H17.4727L18.2335 7.47822L18.9943 9.62058H21.4565L19.4645 10.9446ZM19.4645 4.68154L20.2254 6.8239L18.2335 5.49988L16.2416 6.8239L17.0025 4.68154L15.0105 3.35753H17.4727L18.2335 1.21517L18.9943 3.35753H21.4565L19.4645 4.68154Z" fill="#0052B4" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5_807">
                                                <rect width="47" height="43" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    :
                                    <svg width="47" height="43" viewBox="0 0 47 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_5_809)">
                                            <path d="M23.5 43C36.4787 43 47 33.3741 47 21.5C47 9.62588 36.4787 0 23.5 0C10.5213 0 0 9.62588 0 21.5C0 33.3741 10.5213 43 23.5 43Z" fill="#6DA544" />
                                            <path d="M23.4999 8.41306L42.9129 21.5L23.4999 34.587L4.08691 21.5L23.4999 8.41306Z" fill="#FFDA44" />
                                            <path d="M23.5 28.9782C28.0143 28.9782 31.6739 25.6301 31.6739 21.5C31.6739 17.3699 28.0143 14.0218 23.5 14.0218C18.9857 14.0218 15.3262 17.3699 15.3262 21.5C15.3262 25.6301 18.9857 28.9782 23.5 28.9782Z" fill="#F0F0F0" />
                                            <path d="M19.4129 21.0326C17.9915 21.0326 16.6198 21.2304 15.3286 21.5974C15.3858 25.6824 19.0213 28.9783 23.4999 28.9783C26.2692 28.9783 28.7151 27.7171 30.1936 25.7896C27.664 22.8924 23.7717 21.0326 19.4129 21.0326V21.0326Z" fill="#0052B4" />
                                            <path d="M31.5222 22.9328C31.6206 22.4688 31.6738 21.9902 31.6738 21.5C31.6738 17.3698 28.0142 14.0218 23.4999 14.0218C20.1315 14.0218 17.2399 15.8863 15.9885 18.5484C17.0947 18.3387 18.2399 18.2283 19.413 18.2283C24.1605 18.2282 28.4553 20.0337 31.5222 22.9328V22.9328Z" fill="#0052B4" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5_809">
                                                <rect width="47" height="43" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                                {item?.id == 1
                                    ?
                                    <p className="font-metropolis">inglês </p>

                                    :
                                    <p className="font-metropolis">Português </p>

                                }
                            </BoxLanguage>
                        )
                    })}


                </RowLanguage> */}
            
            <div className="flex items-center gap-3.5 justify-center sm:justify-center">
                            <FaFacebookSquare size={"30px"} className="cursor-pointer text-[#319e96] hover:text-black" onClick={() => window.open("https://www.facebook.com/", "_blank")}/>
                            <FaSquareXTwitter size={"30px"} className="cursor-pointer text-[#319e96] hover:text-black" onClick={() => window.open("https://www.x.com", "_blank")}/>
                            <FaInstagramSquare size={"30px"} className="cursor-pointer text-[#319e96] hover:text-black" onClick={() => window.open("https://www.instagram.com/universo_agro/", "_blank")}/>
            </div>
            </Footer>
        </SidebarEl>

    )
}

