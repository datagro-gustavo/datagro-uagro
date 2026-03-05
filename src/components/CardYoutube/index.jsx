'use client'

import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
    position: relative;
    width: ${'298px'};
    height: ${'249px'};
    overflow: hidden;
`

const CardYoutube = ({ emphasis, link, image }) => {

    const [play, setPlay] = useState(false);

    const extractId = (url) => {
        const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^"&?/\s]+)/;
        const match = url.match(regex);
        return match ? match[1] : url;
    }

    const videoId = extractId(link);

    return (
        <CardWrapper emphasis={emphasis}>
            {!play ? (
                <button
                    onClick={() => setPlay(true)}
                    className="absolute inset-0 w-full h-full"
                    style={{ position: "relative" }}
                >
                    <Image  width={300} height={300} src={image} className="w-full h-full object-cover block" alt="image"/>
                    <span className="absolute inset-0 grid place-items-center z-10 cursor-pointer hover:scale-90">
                         <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="58.8" height="58.8" rx="29.4" fill="#8CB024" />
                            <path d="M38.1303 28.3341C38.8396 28.7631 38.8396 29.7919 38.1303 30.2208L23.9987 38.7683C23.2639 39.2126 22.3256 38.6836 22.3256 37.8248L22.3256 20.7301C22.3256 19.8713 23.2639 19.3423 23.9987 19.7867L38.1303 28.3341Z" fill="white" />
                        </svg>
                    </span>
                </button>
            ) : (
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: "none" }}
                ></iframe>
            )}
        </CardWrapper>
    );
};

export default CardYoutube;
