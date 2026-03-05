'use client'

import React, { useContext, useState } from "react";

import styled from "styled-components";
import { validate } from "react-email-validator";

/* CONTEXT */
import { ModalContext } from "@/context/modal";


/* IMAGES */
import companyIcon from '../../assets/logos/logo-uagro.png'
import appleIcon from '../../assets/icons/Img - Apple.png'
import bbaIcon from '../../assets/icons/Img - Bloomberg Terminal.png'
import linkedInIcon from '../../assets/icons/linkedin (2) 1.png'

/* COMPONENTS */

import ButtonSign from "../ButtonSign";
import ButtonSocial from "../ButtonSocial";
import InputLogin from "../InputLogin";
import Image from "next/image";


const CardWrapper = styled.div`
    transition: all .2s;
    position: fixed;
    padding-top: 3rem;
    left: 50%;
    top: ${props => props.show != 'false' ? '50%' : '-999%'} ;
    background-color: white;
    z-index: 9999999999;
    transform: translate(-50%,-50%);
    width: 650px;
    height: 675px;

    body{
        background-color: red;
    }


    @media screen and (max-width:920px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 0rem;
        width: 96%;
        
    }


`
const HeaderCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.6rem;
    padding-right: 1.6rem;

    svg{
        cursor: pointer;
    }


`
const BodyCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;

    p{
        font-size: 0.8rem;
    }

    @media screen and (max-width:920px){

        h1{
            margin-top: 3rem;
        }

        p{
            font-size: 0.6rem;
            text-align: center;
        }
        
    }


`
const FooterCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        margin-top: 0.5rem;
        margin-bottom: 0.1rem;
    }

    #textSecondary{
        cursor: pointer;
        border-bottom: 1px solid black;
        &:hover{
            border-bottom: 1px solid blue;
        }
    }

`
const CompanyImage = styled.img`
    width: 110px;
`
const OrLine = styled.div`

    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid #CCCCCC;
    margin-top: 1rem;
    margin-bottom: 1.9rem;

    p{
        position: relative;
        top: 9px;
        z-index: 9999;
    }

`
const CleanLine = styled.div`
    position: absolute;
    bottom: -6px;
    width: 39px;
    height: 10px;
    background-color: white;
`

export const ModalSign = () => {
    const { modalLogin, setModalLogin } = useContext(ModalContext)
    const [validMail, setValidMail] = useState()

    const getMail = (e) => {

        if (e == '') {
            setValidMail()
            return
        }

        const mailIsValid = validate(e);
        if (!mailIsValid) {
            setValidMail(false)
            return false
        }
        setValidMail(true)
    }

    return (
        <CardWrapper show={modalLogin}>
            <HeaderCard>
                <Image width={100} height={100} alt="logo da empresa"  src={companyIcon} />

                <div onClick={() => setModalLogin('false')}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0723 9L16.2949 2.77734C16.4473 2.625 16.5234 2.44629 16.5234 2.24121C16.5234 2.03613 16.4473 1.85742 16.2949 1.70508C16.1426 1.55273 15.9639 1.47656 15.7588 1.47656C15.5537 1.47656 15.375 1.55273 15.2227 1.70508L9 7.92773L2.77734 1.72266C2.625 1.57031 2.44629 1.49414 2.24121 1.49414C2.03613 1.49414 1.85742 1.57031 1.70508 1.72266C1.55273 1.875 1.47656 2.05371 1.47656 2.25879C1.47656 2.46387 1.55273 2.64258 1.70508 2.79492L7.92773 9L1.70508 15.2227C1.55273 15.375 1.47656 15.5537 1.47656 15.7588C1.47656 15.9639 1.55273 16.1426 1.70508 16.2949C1.78711 16.3652 1.87207 16.4209 1.95996 16.4619C2.04785 16.5029 2.13867 16.5234 2.23242 16.5234C2.32617 16.5234 2.41992 16.5029 2.51367 16.4619C2.60742 16.4209 2.68945 16.3652 2.75977 16.2949L9 10.0723L15.2227 16.2949C15.3047 16.3652 15.3896 16.4209 15.4775 16.4619C15.5654 16.5029 15.6562 16.5234 15.75 16.5234C15.8438 16.5234 15.9375 16.5029 16.0312 16.4619C16.125 16.4209 16.207 16.3652 16.2773 16.2949C16.4297 16.1426 16.5059 15.9639 16.5059 15.7588C16.5059 15.5537 16.4297 15.375 16.2773 15.2227L10.0723 9Z" fill="black" />
                    </svg>
                </div>

            </HeaderCard>
            <BodyCard>

                <h1 className="font-metropolis font-bold text-lg mb-7">Login</h1>
                <p className="font-metropolis text-md">Ao continuar, concordo que a UAGRO pode me enviar notícias e ofertas.</p>
                <p className="font-metropolis text-md">relacionado aos produtos da UAGRO. Também reconheço os <a >termos</a></p>
                <p className="font-metropolis text-md">ao concordar em <a href="https://portal.UAGRO.com/pt/about/terms" style={{ textDecoration: 'underline', cursor: "pointer" }}>Termos de serviço.</a></p>
                <InputLogin valid={validMail} onChange={(e) => getMail(e.target.value)} />
                <ButtonSign valid={validMail} name="Continuar" />
                <OrLine>
                    <p>ou</p>
                    <CleanLine />
                </OrLine>
                <ButtonSocial alt="Imagem Linkedin" name="Continuar com o LinkedIn" border={'true'} img={linkedInIcon} />
                <ButtonSocial alt="Imagem Apple" name="Continuar com a Apple" border={'false'} img={appleIcon} />
                <ButtonSocial alt="Imagem BBa" name="Continuar com BBA" border={'false'} img={bbaIcon} />
            </BodyCard>
            <FooterCard>
                <p className="font-metropolis font-medium text-sm">Não possui uma conta?</p>
                <p className="font-metropolis font-medium text-sm" id="textSecondary">Entre em contato com nossa equipe</p>

            </FooterCard>
        </CardWrapper>
    )
}