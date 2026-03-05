'use client'

import React, { useState, useContext } from "react";

import polygon from "../../assets/icons/Polygon 7 (5).png";
import { NewsContext } from "@/context/news";
import Image from "next/image";

const Menu = () => {
    const { linkColor } = useContext(NewsContext);
    const [open, setOpen] = useState(null);
    const [openSub, setOpenSub] = useState(null);

    const data = [
        {
            id: 1,
            name: "Análises",
            data: [
                {
                    name: "Alertas Climáticos",
                    data: [
                        {
                            name: "El Niño & La Niña"
                        },
                        {
                            name: "Geada"
                        },
                        {
                            name: "Incêndios"
                        },
                        {
                            name: "Onda de Calor"
                        }
                    ],
                },

                {
                    name: "Análises & Tendências",
                    data: [],
                },
                {
                    name: "Energia",
                    data: [
                        {
                            name:
                                "asdsd"
                        }
                    ],
                },

            ],
        },
        {
            id: 2,
            name: "Banco de dados",
            data: [
                {
                    name: "Aves (Corte e Ovos)"
                },
                {
                    name: "Bovinos (Corte e Leite)"
                },
                {
                    name: "Consumo"
                },
            ],
        },
    ];

    const handleClick = (id) => {
        setOpen(open === id ? null : id);
        setOpenSub(null);
    };

    const handleSubClick = (key) => {
        setOpenSub(openSub === key ? null : key);
    };

    return (
        <div className="rounded-md bg-white shadow-md px-3 pt-3">
            {data.map((item) => (
                <div key={item.id} className=" relative mb-3">

                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleClick(item.id)}
                    >
                        <div className="mr-2">
                            {open === item.id ? (
                                <Image  width={30} height={30} src={polygon} alt="open" className="w-[13px] relative top-2" />
                            ) : (
                                <div
                                    style={{ background: linkColor?.color }}
                                    className="w-[11px] h-[11px] rounded-full"
                                />
                            )}
                        </div>
                        {open === item.id && item.data?.length > 0

                            ?
                            <p className="font-metropolis text-sm relative top-1.5 ">{item.name}</p>
                            :
                            <p className="font-metropolis text-sm relative top-0 ">{item.name}</p>
                        }
                    </div>

                    {open === item.id && item.data?.length > 0 && (
                        <div className="relative ml-0 mt-0 flex">
                            <div className="absolute left-[5px] bottom-2  top-0 w-[2px] bg-gray-300" />


                            <div className="ml-4 mt-1  flex flex-col w-full">

                                {item.data.map((sub, index) => {
                                    const key = `${item.id}-${index}`;
                                    const hasChildren = sub?.data?.length > 0;

                                    return (
                                        <div key={key} className=" relative mt-2 ">
                                            <div className="relative flex items-center cursor-pointer">

                                                {hasChildren
                                                    ?
                                                    <div className="absolute left-[-11px] top-1/2 w-[16px] h-[2px] bg-gray-300" >
                                                        <div style={{ background: linkColor?.color }} className="mt-[-2px] ml-[7px] w-[6px] h-[6px] rounded-full " />
                                                    </div>
                                                    :
                                                    <div className="absolute left-[-11px] top-1/2 w-[16px] h-[2px] bg-gray-300" />
                                                }


                                                <p
                                                    onClick={() => hasChildren && handleSubClick(key)}
                                                    className="font-metropolis text-[13px] ml-2 hover:text-secondary"
                                                >
                                                    {sub.name}
                                                </p>
                                                {!hasChildren
                                                    ?
                                                    <div className="absolute right-0">
                                                        <svg width="8" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15 8.66025L2.31191e-07 17.3205L1.78701e-06 -6.99479e-06L15 8.66025Z" fill="#303030" />
                                                        </svg>

                                                    </div>

                                                    :

                                                    <></>}

                                            </div>

                                            {openSub === key && hasChildren && (
                                                <div className=" mb-5  ml-1 border-l-2 mt-[-9px] flex flex-col gap-0">


                                                    {sub.data.map((child, i) => (
                                                        <div
                                                            key={i}
                                                            className="relative flex items-center text-[12px] mt-7  text-gray-600 hover:text-secondary cursor-pointer"
                                                        >
                                                            <div className="ml-0 w-[10px]  h-[2px] bg-gray-300 " />
                                                            <p className="ml-1 text-[13px] absolute ml-4">{child.name}</p>
                                                            <div className="absolute right-0">
                                                                <svg width="8" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15 8.66025L2.31191e-07 17.3205L1.78701e-06 -6.99479e-06L15 8.66025Z" fill="#303030" />
                                                                </svg>

                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>

                                            )}

                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Menu;
