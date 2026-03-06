'use client'

import React from 'react'
import { useTranslation } from 'react-i18next';

export const Climate = () => {

    const handleClick = (link) => { window.open(link); }
    const { i18n } = useTranslation();
    const langCode = i18n.language === 'pt-BR' ? 'pt_br' : i18n.language === 'en-US' ? 'en' : 'es';

    return (
        <section className="w-full flex justify-center py-8">
            <div className="w-full max-w-[420px] bg-white  shadow-sm ring-1 ring-black/10 overflow-hidden ">

                <div className="px-4 py-3 border-b border-black/10">
                    <p className="text-lg font-semibold text-[#319e96]">
                        Tempo Agora
                    </p>
                </div>

                <div className="flex justify-center">
                    <iframe
                        id="frameclima"

                        src={`https://rotinas.datagro.com/Portal/assets/widgets/clima/${langCode}/cli.php`}
                        scrolling="no"
                        className="border-0 w-[360px] h-[140px] p-8 ml-6"
                        title="Tempo Agora"
                    />
                </div>
                {/* <div className='w-full border-t border-black/10 hover:bg-black/5 cursor-pointer' onClick={() => handleClick('https://portal.datagro.com/pt/misc/climate/31')}>
                    <p className="text-md text-center text-black p-2"> Veja Mais</p>
                </div> */}
            </div>
        </section>
    )
}