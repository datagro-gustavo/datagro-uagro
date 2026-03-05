'use client'

import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import sound from '../../sounds/Pumped up Kicks (feat. Joy Corporation) [ZWHRpjErj3I].mp3'

import styled from "styled-components";

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 150px;
`

export const MusicPlayer = () => {
    return (
        <CardWrapper>
            <AudioPlayer
                autoPlay
                src={sound}
                onPlay={e => console.log("onPlay")}
            />
        </CardWrapper>
    )
}