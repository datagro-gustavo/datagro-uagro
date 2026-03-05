'use client'

import React, { useContext, useEffect } from "react"

import { NewsContext } from "@/context/news"

const Clean = ({ scrolled }) => {


    return (

        <div>
            {scrolled ?
                <div className=" h-120px md:h-[520px]" />
                :
                <></>
            }
        </div>

    )
}

export default Clean