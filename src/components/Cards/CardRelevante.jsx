'use client'

import React, { useContext } from 'react'

import { ThemeContext } from '@/context/theme';
import Image from 'next/image';


export const CardRelevante = ({
    imagem,
    categoria,
    titulo,
    texto,
    inserirTexto,
    mobile,
    sm,
    onClick
}) => {
    const { theme } = useContext(ThemeContext)

    const textColor = theme ? "text-[#18181B]" : "#FFFFFF";

    return (
        <div onClick={onClick} className={`${mobile ? 'w-full flex' : 'max-w-none'} cursor-pointer text-[${textColor}] `}>
            <div className={`w-full bg-green-400  ${mobile ? 'max-h-full w-1/2' : 'h-40'} `}>
                <Image   width={30} height={30} src={imagem} className="w-full h-full object-cover" alt={titulo} />

            </div>
            <div className={`${mobile ? 'hidden' : ''} hover:underline mt-4`}>
                <span className={``}> {categoria} </span>
            </div>

            <div className={`${mobile ? 'flex' : ''} hover:underline`}>
                <div className={`${mobile ? 'p-2 items-center justify-center' : ''}`}>
                    <span className={`${mobile ? 'text-sm' : ''} font-bold text-md`}>{titulo}</span>
                </div>
            </div>

            {inserirTexto && (
                <div className='break-all w-full hover:underline'>
                    <div className=''>
                        <span className={`${sm ? 'text-sm' : 'text-lg'}`}>{texto}</span>
                    </div>
                </div>)
            }
        </div>
    )
}
