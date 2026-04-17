'use client'

import React from 'react'
import { useTranslation } from 'react-i18next';

export const Climate = () => {

    const handleClick = (link) => { window.open(link); }
    const { i18n } = useTranslation();
    const langCode = i18n.language === 'pt-BR' ? 'pt_br' : i18n.language === 'en-US' ? 'en' : 'es';

    return (
        <section className="w-full flex justify-center py-8">


                    <iframe
                        src={`https://publicador.uagro.com.br/clima_g/pt_br/cli.php`}
                        className='md:h-[280px]'

                    />
                {/* <div className='w-full border-t border-black/10 hover:bg-black/5 cursor-pointer' onClick={() => handleClick('https://portal.datagro.com/pt/misc/climate/31')}>
                    <p className="text-md text-center text-black p-2"> Veja Mais</p>
                </div> */}
        </section>
    )
}
