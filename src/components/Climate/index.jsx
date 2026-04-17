'use client'

import React from 'react'
import { useTranslation } from 'react-i18next';

export const Climate = () => {

    const handleClick = (link) => { window.open(link); }
    const { i18n } = useTranslation();
    const langCode = i18n.language === 'pt-BR' ? 'pt_br' : i18n.language === 'en-US' ? 'en' : 'es';

    return (

        <div className=''>
            <iframe
                src={`https://publicador.uagro.com.br/clima_g/pt_br/cli.php`}
                className='w-[320px] h-[560px] '
                scrolling="no"
            />
        </div>

    )
}
