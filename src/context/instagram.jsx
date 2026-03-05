'use client'

import { createContext, useEffect, useState } from "react";
import api_instagram from "../services/api_instagram";

export const InstaGramContext = createContext();

export function InstagramProvider({ children }) {

    const [posts, setPosts] = useState([])
    const [modalInstagram,setModalInstagram] = useState(false)


    const getInstagramPosts = async () => {
        const response = await api_instagram.get(`me/media`, {
            fields: 'id,caption,media_url,permalink,media_type,thumbnail_url,timestamp',
            access_token: "IGAAM0DDqBTv9BZAGJwVmpxQzQ0clJlaHpLb3NCWFVPNGZApZA2xWTVViR1JvWTFkQTJMS0liVWtXOUVtZAzh4TDlFZADJadkswSEJzMGNtaHFQUE9SbHBYU1FxUkw4TVQ5ZA0V0Y1MwR29jTUNFSWFlUkthMjhZAUFllWUp6Vmdib3ZADWQZDZD"
        })

        
        if (response.status == 200) {
            setPosts(response.data)
            return false
        }

        if (response.status == 404) {
            setPosts([])
        }
    }

    useEffect(() => {
        getInstagramPosts()
    },[])

    return (
        <InstaGramContext.Provider value={{
            getInstagramPosts,
            posts,
            setModalInstagram,
            modalInstagram
        }}>
            {children}
        </InstaGramContext.Provider>
    );
}