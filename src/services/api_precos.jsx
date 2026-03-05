'use client'

import { create } from 'apisauce'

export const configureApiPrecos = (baseURL) => {
    if (baseURL) api.setBaseURL(baseURL);
}

const api = create({
    baseURL: process.env.NEXT_PUBLIC_PRICES_API,
})



export default api
