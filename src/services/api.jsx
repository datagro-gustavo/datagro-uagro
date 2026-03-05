'use client'

import { create } from 'apisauce'

export const configureApi = (baseURL) => {
    if (baseURL) api.setBaseURL(baseURL);
}

const api = create({
    baseURL: "https://api.uagro.com.br/",
})



export default api

