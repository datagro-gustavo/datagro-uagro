'use client'

import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import footer from '../../constants/footer'
import Image from "next/image";
import logoUagro from '../../assets/logos/logoUagro.png'
import styled from "styled-components";

import facebookIcon from '../../assets/icons/facebook-app-symbol 1.png'
import youtubeIcon from '../../assets/icons/youtube (2) 1.png'
import twitterIcon from '../../assets/icons/twitter 1.png'
import linkedIcon from '../../assets/icons/linkedin 1.png'


const ImageCompany = styled.img`
    width: 160px;

    @media screen and (max-width:920px) {

        margin: 0 auto;
        margin-bottom: 2rem;
        
    }


`
const BoxSocialIcon = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1.1rem;
    svg{
        margin-top: 0.9rem;
        width: 1.6rem;
        margin-right: 1rem;
        height: 35px;
    }

    @media screen and (max-width:920px){

        margin-top: 0.9rem;
        flex-direction: column;
        align-items: center;
        
        svg{
            margin-bottom: 0.9rem;
        }

    }


`

/* IMAGES */
import companyIcon from '../../assets/logos/logo-uagro.png'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { MattersContext } from "@/context/matters";
import { useRouter } from "next/navigation";

export const Footer = () => {

    const {matters} = useContext(MattersContext)
    const router = useRouter()

    const handleNavigateToPage = (id, name) => {
        router.push(
            `/editoria/${id}/${name}`,
        )
    }
    return (
        <footer className=" font-metropolis relative bg-[#319e96] text-gray-300 py-10 w-full h-[auto] ">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left justify-items-center sm:justify-items-start">

                <div>
                    <Image alt="logo da empresa" width={600} height={600} className="w-[160px]" src={logoUagro} />


                        <div className="flex items-center gap-3.5 justify-center sm:justify-center">

                            <FaFacebookSquare size={"30px"} className="cursor-pointer text-white hover:text-[#000000]" onClick={() => window.open("https://www.facebook.com/", "_blank")}/>
                            <FaSquareXTwitter size={"30px"} className="cursor-pointer text-white hover:text-[#000000]" onClick={() => window.open("https://www.x.com")}/>
                            <FaInstagramSquare size={"30px"} className="cursor-pointer text-white hover:text-[#000000]" onClick={() => window.open("https://www.instagram.com/universo_agro/", "_blank")}/>

                        </div>




                </div>

                <div>
                    <h3 className=" text-lg font-semibold mb-4 text-[white] text-lg border-b border-[#FFFFFF] pb-2  ">Notícias</h3>
                    <ul className="space-y-2">
                        {matters?.map((item, index) => {
                            return (
                                <li key={index} onClick={() => handleNavigateToPage(item?.Id, item?.Name)}><a href="#" className="hover:text-white transition-colors text-[#FFFFFF]">{item.Name}</a></li>
                            )
                        })}

                    </ul>
                </div>
                <div>
                   <span className="text-lg font-semibold mb-4 text-[white] text-lg border-b border-[#FFFFFF] pb-2  ">Contato</span>
                   <p className="mt-2 text-[#FFFFFF]">Email: <a href="mailto:contato@uagro.com.br" className="hover:text-white transition-colors">contato@uagro.com.br</a></p>
                </div>
                {/* <div>
                    <h3 className="text-lg font-semibold mb-4 text-[white] text-lg border-b border-[#FFFFFF] pb-2 ">Cotações & Análises</h3>
                    <ul className="space-y-2 ">
                        {footer?.colunaCotacoes.map((item, index) => {
                            return (
                                <li key={index}> <a href="#" className="hover:text-white transition-colors text-[#FFFFFF]">{item.valor}</a></li>

                            )
                        })}

                    </ul>
                </div> */}


            </div>

            <div className="absolute grid grid-cols-1 sm:grid-cols-3 justify-items-center items-center bg-[#211E1F] w-full h-[70px] mt-10 text-center">
                <div></div>
                <div >
                    <p>&copy; Uagro  - Todos os direitos reservados.</p>
                </div>


            </div>
        </footer>
    );
};
