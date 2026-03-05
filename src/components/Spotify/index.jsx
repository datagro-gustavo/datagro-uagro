'use client'

import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ThemeContext } from "@/context/theme";

const CardWrapper = styled.div`
    height: auto !important;
`;

const SpotifyFrame = styled.iframe`
  border-radius: 12px;
  margin-top: 1rem;
  width: 90%;
  height: 80px;
  border: none;
`;

const Spotify = ({ playlistId }) => {
    const { theme } = useContext(ThemeContext)
    const [playlistName, setPlaylistName] = useState("");
    const [token, setToken] = useState("");

    const clientId = "49ab0579f46d4e5089dfa41d1532d593";
    const clientSecret = "1a544e0018ea4678abfe866abf47b69c";
    const textColorPrimary = theme ? "#191919" : "#FFFFFF";
    const date = new Date()

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
        <CardWrapper>
            <p className={`text-lg font-metropolis h-[5px] font-bold  text-[${textColorPrimary}] py-3`}>
                {playlistName || "..."}
            </p>
            <p className="font-metropolis font-medium text-md text-[#191919] mt-7">Justiça decreta falência da Oi | COP30 contra o
                negacionismo climático</p>

            <SpotifyFrame
                src={`https://open.spotify.com/embed/playlist/${playlistId}`}
                allow="encrypted-media"
            />
            <p className="text-[#4B5563] font-metropolis font-bold text-[12px] mt-3">Atualizado {date.toLocaleDateString()}</p>        

        </CardWrapper>
    );
};

export default Spotify;
