'use client'

import React, { useContext } from "react";

import { InstaGramContext } from "@/context/instagram";

const BackgroundInstagram = () => {

    const { setModalInstagram, modalInstagram } = useContext(InstaGramContext)

    return (
        modalInstagram == true
            ?
            <div onClick={() => setModalInstagram(false)} className="fixed bg-[#000000b8] z-[999999] w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            :
            <></>

    )
}

export default BackgroundInstagram