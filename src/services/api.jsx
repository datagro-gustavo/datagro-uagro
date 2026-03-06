'use client'

import { create } from 'apisauce'

export const configureApi = (baseURL) => {
    if (baseURL) api.setBaseURL(baseURL);
}

const api = create({
    baseURL: process.env.NEXT_PUBLIC_NEWS_API,
})



export default api

