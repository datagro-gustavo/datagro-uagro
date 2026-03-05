'use client'

import React, { useContext } from 'react'



import { QuadrosContext } from '@/context/quadros'
import { RenderTables } from '../MainChart/renderTables'


export const QuadrosQuotes = () => {
    const { quadrosIntegra } = useContext(QuadrosContext)

    return (
        <div className="flex mt-10 flex-wrap p-3 -mx-1 items-center justify-center">
            {Object.values(quadrosIntegra)?.map((grupo, i) => (
                <div key={i} className={`w-full sm:w-1/2 lg:w-1/3 px-1 ${i > 0 ? ' sm:border-l sm:border-slate-300' : ''} mb-4 sm:mb-5`}>
                    <RenderTables dados={grupo} />
                </div>
            ))}
        </div>
    )
}
