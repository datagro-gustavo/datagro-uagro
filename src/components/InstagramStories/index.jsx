'use client'

import React, { useContext, useState } from "react";
import Image from "next/image";


import { InstaGramContext } from "@/context/instagram";
import rightArrow from '../../assets/icons/rightArrow.png'
import leftArrow from '../../assets/icons/leftArrow.png'


const InstagramStories = () => {

    const { modalInstagram, setModalInstagram } = useContext(InstaGramContext)

    const [currentStory, setCurrentStory] = useState(0);

    const stories = [
        {
            url: "/videos/gui.mp4",
            type: "video",
            duration: 5000,
        },
        {
            url: "/videos/gui2.mp4",
            type: "video",
            duration: 5000,
        }
    ];

    const nextStory = () => {
        if (currentStory < stories.length - 1) {
            setCurrentStory(prev => prev + 1);
        }
    };

    const prevStory = () => {
        if (currentStory > 0) {
            setCurrentStory(prev => prev - 1);
        }
    };

    return (
        modalInstagram == true

            ?
            <div className=" z-[99999999] fixed w-[74%] h-[60%] md:w-[420px] md:h-[520px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  flex justify-center items-center ">

                <div className=" flex justify-center h-[auto]  md:w-[520px] ">

                    <div className=" relative  w-[99%] h-[90%] md:w-[380px] md:h-[620px]">

                    <button onClick={() => prevStory()} className="absolute left-[-15%] top-0 h-full w-[30%] z-10  ">
                        <span className="absolute inset-0 grid place-items-center z-10 cursor-pointer  hover:scale-90">
                            <Image  width={30} height={30} className=" w-[49px] md:w-[65px]" src={leftArrow} alt="Image"/>
                        </span>
                    </button>


                        <button onClick={() => nextStory()} className="absolute right-[-15%] top-0 h-full w-[30%] z-10 ">
                            <span className="absolute inset-0 grid place-items-center z-10 cursor-pointer hover:scale-90">

                            <Image  width={30} height={30} className=" w-[49px] md:w-[65px]" src={rightArrow} alt="Image"/>
                        </span>
                    </button>


                        {/* <Stories
                            stories={stories}
                            currentIndex={currentStory}
                            onStoryEnd={() => {
                                if (currentStory < stories.length - 1) {
                                    setCurrentStory(prev => prev + 1);
                                }
                            }}
                            onAllStoriesEnd={() => setCurrentStory(0)}
                            width="100%"
                            height="100%"
                        /> */}
                    </div>
                </div>
            </div>
            :
            <></>

    );
};

export default InstagramStories;
