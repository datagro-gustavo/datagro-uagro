'use client'

import React, { useContext, useState, useEffect } from "react"

/* COMPONENTS */
import { NavBar } from "../../components/NavBar/NavBar"
import { Footer } from "../../components/Footer"
import { ThemeContext } from "../../context/theme"
import { Aside } from "../../components/Aside"
import TechColumnist from "../../components/TechColumnist"
import { Notice } from "../../components/Notice"
import { Sidebar } from "../../components/Sidebar"
import ScrollToTop from "../../components/ScrollToTop"
import { ModalSign } from "../../components/ModaSign";
import BackgroundModal from "../../components/BackgroundModal";
import styled from "styled-components"
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton"
import TechSection from "../../components/TechSection";
import { ColumnContext } from "../../context/column"
import InfiniteScroll from "@/components/InfiniteScroll";
import Tags from "../Tags"

import twitterIcon from '../../assets/icons/twitter (2).png'
import facebookIcon from '../../assets/icons/Ellipse 2.png'
import linkedinIcon from '../../assets/icons/linkedin.png'
import whatsIcon from '../../assets/icons/whatsIcon.png'
import linkIcon from '../../assets/icons/link (4).png'

/* CONTEXT */
import { NewsContext } from "../../context/news"
import { toast, ToastContainer } from "react-toastify"
import { PaywallModal } from "../../components/PaywallModal"
import { AuthContext } from "../../context/auth"

import Image from "next/image"
import { SafeImage } from "../SafeImage"

const BoxInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0rem;
    margin-top: 1.1rem;


    @media screen and (max-width:920px){
        flex-direction: column;
        align-items: flex-start;
        
    }

`
const RowItems = styled.div`
    display: flex;
    gap: 20px;

    @media screen and (max-width:920px) {
        flex-direction: column;
        margin-top: 0.5rem;
        gap:0px;
        div{
            margin-bottom: 1.3rem;
            margin-left: 0rem;
        }   
    }

`
const BoxItem = styled.div`
    display: flex;
    align-items: center;

    transition: all .2s;
    img:hover{
        transform: translateY(-5%);
    }
    

    p{
        margin-left: 0.5rem;
    }

    @media screen and (max-width:920px){
        
        margin-right: 1rem;

    }   

`
const CardAuthor = styled.div`
    display: flex;
    align-items: center;

    p{
        margin-left: 0.9rem;
    }
    
    img{
        object-fit: cover;
        width: 35px;
        height: 35px;
        border-radius: 100%;
    }

    @media screen and (max-width:920px){
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        
    }

`
const SquareSkeleton = styled(Skeleton)`
    width: 296px !important;
    height: 166px !important;
    
    @media screen and (max-width:920px){
        width: 90% !important;
        height: 218px !important;

    }

    @media screen and (min-width: 1650px) {
        width: 360px !important;
        height: 218px !important;
    }


`;
const BoxSkeleton = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  flex-direction: row;
  justify-content: center;
  gap: 20px; // opcional
  margin-bottom: 1.5rem;
  
@media screen and (max-width:920px){
  grid-template-columns: 1fr !important;
  justify-content: center;
  align-items: center;
  width: 100% !important;
}


`;
const AnimatedImage = styled.div`
    width:100%;
    height: 100%;
`

// const SafeImage = ({ src, alt, className }) => {
//     const [currentSrc, setCurrentSrc] = useState(null);
//     const [extensionIndex, setExtensionIndex] = useState(0);
//     const [error, setError] = useState(false);

//     const extensions = ["jpg", "jpeg", "png"];

//         const transformUrl = (url) => {
//         if (!url) return null;

//         const S3 = "https://s3-uagro.s3.amazonaws.com";
//         const u = String(url).trim();

//         const needle = "//noticias_img/";
//         const idx = u.indexOf(needle);
//         if (idx !== -1) {
//             const tail = u.slice(idx + 2); // começa em "noticias_img/..."
//             return `${S3}/${tail.replace(/^\/+/, "")}`;
//         }

//         let pathname = u;
//         try {
//             pathname = new URL(u).pathname; //  "/wp-content/uploads/..."
//         } catch {

//         }

//         const wp = pathname.indexOf("/wp-content/");
//         if (wp !== -1) {
//             const after = pathname.slice(wp + "/wp-content/".length); // OLOCO "uploads/..."
//             return `${S3}/${after.replace(/^\/+/, "")}`;
//         }
//         // UFA
//         if (pathname.startsWith("/")) return `${S3}${pathname}`;
//         return `${S3}/${pathname}`;
//         };

//     useEffect(() => {
//         if (!src) return;

//         const baseUrl = transformUrl(src);
//         if (!baseUrl) return;

//         const noExtension = baseUrl.replace(/\.(jpg|jpeg|png)$/i, "");

//         setExtensionIndex(0);
//         setCurrentSrc(`${noExtension}.${extensions[0]}`);
//         setError(false);
//     }, [src]);

//     const handleError = () => {
//         const baseWithoutExt = currentSrc.replace(/\.(jpg|jpeg|png)$/i, "");

//         if (extensionIndex < extensions.length - 1) {
//             const nextIndex = extensionIndex + 1;
//             setExtensionIndex(nextIndex);
//             setCurrentSrc(`${baseWithoutExt}.${extensions[nextIndex]}`);
//         } else {
//             setError(true);
//         }
//     };

//     if (!currentSrc || error) {
//         return (
//             <>   
//             </>
//         );
//     }

//     return (
//         <Image
//             src={currentSrc}
//             alt={alt}
//             width={500}
//             height={500}
//             className={className}
//             loading="lazy"
//             onError={handleError}
//         />
//     );
// };

export const SectionNews = ({ id, slug }) => {

    const location = window.location.pathname

    const { getByHref, notice, animated, setPageType, rowNotices, loadMoreRowNotices, hasMoreRows, loadingRows, getById } = useContext(NewsContext)
    const { columnistName, columnistImage, columnistMiniBio } = useContext(ColumnContext)
    const { theme } = useContext(ThemeContext)
    const [scrolled, setScrolled] = useState(false);
    const [scrolledPaywall, setScrolledPaywall] = useState(false);
    const { user } = useContext(AuthContext)

    const CHUNK_SIZE = 8;

    // monta os chunks
    const chunks = [];
    for (let i = 0; i < rowNotices.length; i += CHUNK_SIZE) {

        chunks.push(rowNotices.slice(i, i + CHUNK_SIZE));
    }

    const url = `${window.location.origin}${window.location.pathname}`;

    useEffect(() => {
        setPageType("news");

    }, [setPageType]);

    const handleScroll = () => setScrolled(window.scrollY <= 1.9);
    const handleScrollPaywall = () => {
        setScrolledPaywall(window.scrollY >= 120)

    };

    const onClickGoToCategory = (id, item) => {
        const slug = item
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        window.location.href = `/notices/${id}/${slug}`
    };

    const textColorPrimary = theme ? "#74776f" : "text-white";
    const textColorSecondary = theme ? "#18181B" : "text-white"


    useEffect(() => {
        (async () => {
            if (location.state?.url) {
                await getByHref(location.state?.url)
            } else {
                await getById(id)
            }
            setPageType("news");

        })();
    }, [location.state?.url])


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    //    window.addEventListener("scroll", handleScrollPaywall);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const paywall = !user && notice?.importanceLevel === 3;

    const novaUrl = notice?.imageUrl?.replace(
        'https://datagro.imgix.net/wp-content/uploads',
        'https://cdn-datagro.s3.sa-east-1.amazonaws.com/wp-content/uploads'
    );

    const shareTwitter = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const shareFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const shareWhatsApp = () => {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const shareLinkedin = () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success("Link copiado!", {
                    autoClose: 1500
                })
            })
            .catch(err => {
                console.error("Erro ao copiar: ", err);
            });
    };


    return (

        <main className={`${theme ? "bg-white text-black" : "bg-black text-[#FFFFFF]"} min-h-screen flex flex-col justify-center`}>

            {/* {paywall && (
                <PaywallModal scrolledPaywall={scrolledPaywall} noticeId={id} slug={slug} />

            )} */}

            <ScrollToTop />
            <ToastContainer style={{ zIndex: "9999999999" }} />
            <NavBar props={'max-w-7xl mx-auto px-0'} paywall={paywall} />
            <ModalSign />
            <BackgroundModal />
            <motion.main
                initial={{ opacity: 1, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
            >
                <section className="flex flex-col  mx-auto w-full  md:w-[1350px] px-5 md:px-18 ">

                    <div className="flex flex-col md:flex-row">
                        <div className={String(notice?.htmlContent).length >= 1300 ?
                            `
                        w-full pb-3 
             
                        min-h-[1550px] 
                        
                        `
                            :
                            `
                        w-full pb-3 

                        `
                        } >
                            {/* {columnistName
                                ?
                                <div className="md:flex mb-5 items-center justify-between bg-[#f2ffeb] p-4 rounded-lg w-full">

                                    <div className="flex items-center gap-3">
                                        <img

                                            className="w-[68px] h-[68px] object-cover rounded-full"
                                            src={columnistImage}
                                        />
                                        <p className="font-metropolis font-semibold text-[20px]">
                                            {columnistName}
                                        </p>
                                    </div>

                                    <div className="flex-1 px-6">
                                        <p className="text-[15px] leading-snug">
                                            {columnistMiniBio}
                                        </p>
                                    </div>
                                </div>
                                :
                                <></>

                            } */}

                            {/* <p className={`font-metropolis text-sm font-regular cursor-pointer text-[#98BF0E] hover:underline mb-2 text-[${textColorPrimary}]`} onClick={() => { onClickGoToCategory(notice?.markets?.[0].id, notice?.markets?.[0].title) }}>
                                {animated ? <Skeleton width={"10%"} /> : notice?.markets?.[0].title}
                            </p> */}
                            <p className={`font-metropolis mb-2 font-bold text-2xl text-[${textColorSecondary}]`}>

                                {animated ? <Skeleton width={"60%"} /> : notice?.title}
                            </p>
                            <p className="font-metropolis text-md font-normal border-b border-[#003A60] mb-3">
                                {animated ? <Skeleton width={"10%"} /> : notice?.description}
                            </p>

                            <BoxInfo>
                                <CardAuthor>

                                    {animated
                                        ?
                                        <div className="flex items-center">
                                            <div className="w-[35px] h-[35px] ">
                                                <Skeleton width={"100%"} height={"100%"} style={{ borderRadius: "100%" }} />
                                            </div>
                                            <div className="ml-1 w-[35px] h-[10px] ">
                                                <Skeleton width={"100%"} height={"100%"} />
                                            </div>
                                        </div>
                                        :
                                        <>
                                            {notice?.columnistId ?
                                            (
                                                <>
                                                <SafeImage src={notice?.imageUrl} />
                                                <p className="font-metropolis text-sm "><b>Por:</b> autor</p>
                                            </>
                                            )
                                            :
                                            (<> </>)
                                            }
                                            
                                        </>

                                    }
                                </CardAuthor>

                                <RowItems>
                                    <BoxItem>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.5 3.75C9.5 3.33579 9.16421 3 8.75 3C8.33579 3 8 3.33579 8 3.75V8.75C8 9.00859 8.13321 9.24895 8.3525 9.386L11.3525 11.261C11.7038 11.4805 12.1665 11.3738 12.386 11.0225C12.6055 10.6712 12.4988 10.2085 12.1475 9.989L9.5 8.33431V3.75Z" fill="#004B70" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 0C3.91751 0 0 3.91751 0 8.75C0 13.5825 3.91751 17.5 8.75 17.5C13.5825 17.5 17.5 13.5825 17.5 8.75C17.5 3.91751 13.5825 0 8.75 0ZM1.5 8.75C1.5 4.74594 4.74594 1.5 8.75 1.5C12.7541 1.5 16 4.74594 16 8.75C16 12.7541 12.7541 16 8.75 16C4.74594 16 1.5 12.7541 1.5 8.75Z" fill="#004B70" />
                                        </svg>
                                        <p className="">
                                            {animated ? <Skeleton width={"100%"} /> : new Date(notice?.publishDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </BoxItem>
                                    <BoxItem>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99982 3.25C7.41403 3.25 7.74982 3.58579 7.74982 4V5.66763C10.5776 5.4158 13.4221 5.4158 16.2498 5.66763V4C16.2498 3.58579 16.5856 3.25 16.9998 3.25C17.414 3.25 17.7498 3.58579 17.7498 4V5.81644C19.2429 6.02754 20.4224 7.20847 20.6221 8.71484L20.7086 9.36779C21.0726 12.1141 21.0412 14.8984 20.6152 17.6359C20.4042 18.9919 19.3026 20.0335 17.9368 20.1681L16.7438 20.2858C13.5888 20.5969 10.4108 20.5969 7.25574 20.2858L6.06274 20.1681C4.697 20.0335 3.59534 18.9919 3.38433 17.6359C2.95837 14.8984 2.92693 12.1141 3.29097 9.36779L3.37752 8.71484C3.57719 7.20845 4.75674 6.02751 6.24982 5.81643V4C6.24982 3.58579 6.5856 3.25 6.99982 3.25ZM7.44498 7.2028C10.4742 6.90408 13.5254 6.90408 16.5546 7.2028L17.46 7.2921C18.3268 7.37757 19.0206 8.04854 19.1351 8.91194L19.2216 9.56489C19.2519 9.793 19.2792 10.0214 19.3037 10.25H4.69588C4.72036 10.0214 4.74772 9.79301 4.77796 9.5649L4.86451 8.91194C4.97896 8.04854 5.67278 7.37757 6.53953 7.2921L7.44498 7.2028ZM4.57665 11.75C4.47847 13.6381 4.5752 15.5332 4.86649 17.4052C4.97233 18.0854 5.52491 18.6078 6.20995 18.6754L7.40295 18.793C10.4601 19.0945 13.5395 19.0945 16.5966 18.793L17.7896 18.6754C18.4747 18.6078 19.0272 18.0854 19.1331 17.4052C19.4244 15.5332 19.5211 13.6381 19.4229 11.75H4.57665Z" fill="#004B70" />
                                        </svg>
                                        <p className="">{animated ? <Skeleton width={"100%"} /> : new Date(notice?.publishDate).toLocaleDateString()}</p>
                                    </BoxItem>
                                    <BoxItem>
                                        <div className="flex gap-2 ">
                                            <Image src={facebookIcon} alt="icone do facebook" onClick={() => shareFacebook()} className="w-[26px]" />
                                            <Image src={twitterIcon} alt="icone do twitter" onClick={() => shareTwitter()} className="w-[26px]" />
                                            <Image src={linkedinIcon} alt="icone do linkedin" onClick={() => shareLinkedin()} className="w-[26px]" />
                                            <Image src={whatsIcon} alt="icone do whatsapp" onClick={() => shareWhatsApp()} className="w-[26px]" />
                                            <Image src={linkIcon} alt="icone de copiar" onClick={() => copyLink()} className="w-[27px]" />
                                        </div>
                                    </BoxItem>
                                </RowItems>
                            </BoxInfo>

                            {/** IMAGEM */}
                            <figure className="mb-0 flex flex-col items-center">
                                {animated
                                    ?
                                    <AnimatedImage>
                                        <Skeleton width={"100%"} height={"390px"} />
                                    </AnimatedImage>
                                    :
                                    <div className="mt-5 h-[auto] w-full mb-9">
                                        <SafeImage className="w-full h-full" src={novaUrl} alt="foto" isSectionNews={true} />
                                    </div>
                                }
                            </figure>
                             

                            <Notice notice={notice.htmlContent} importanceLevel={notice?.importanceLevel} />
                            <Tags notice={notice}/>
                            {/* {!paywall && (
                                <>
                                    {columnistName

                                        ?
                                        <TechColumnist name={`Outros artigos de ${columnistName}`} mx="0" px="0" />

                                        :
                                        <TechSection name="Outras Notícias" mx="0" px="0" />
                                    }
                                </>
                            )} */}

                        </div>

                        <div className="hidden md:flex border border-r-0 ml-5 mr-5 border-slate-500 h-[auto]" />
                        <Aside />
                    </div>
{/* 
                    {!paywall && (
                        <> */}
                            <InfiniteScroll />
                        {/* </>
                    )} */}

                </section>


            </motion.main>
            <Sidebar />
            <Footer />

        </main>
    )
}