'use client'

import { createContext, useEffect, useState } from "react";

export const SpotifyContext = createContext();

export function SpotifyProvider({ children }) {
    const [token, setToken] = useState("");

    const getToken = async () => {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " + btoa(`${clientId}:${clientSecret}`),
            },
            body: "grant_type=client_credentials",
        });

        const data = await response.json();
        setToken(data.access_token);

        setTimeout(getToken, (data.expires_in - 300) * 1000);
    };

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (!token) return;

        fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPlaylistName(data.name);
            })
            .catch((err) => console.error(err));
    }, [token]);


    return (
        <SpotifyContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </SpotifyContext.Provider>
    );
}
