'use client'

import React, { useEffect } from 'react'
import { SUPPORTED_LANGS, DEFAULT_LANG } from '../../utils/i18n'
import { Navigate, Outlet, useParams } from 'react-router-dom'

export const LangGuard = () => {
    const { lang } = useParams();

    const isValid = SUPPORTED_LANGS.includes(lang)
    
    useEffect(() => {
        if (isValid) {
            document.documentElement.lang = lang;
        }
    }, [lang, isValid])

    if (!isValid) return <Navigate to={`/${DEFAULT_LANG}`} replace />;
    
    return <Outlet />;
}
