'use client'

import React, { useContext, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

import { PricesContext } from '@/context/prices';



export const Precos = () => {
    const { ticker } = useContext(PricesContext)
    const [play, setPlay] = useState(true);

    return (
        <div className="flex w-full bg-[#E3E3E3] overflow-hidden">
            <button
                type="button"
                onClick={() => setPlay(!play)}
                className="bg-[#303030] rounded-r-md min-w-11 md:min-w-6 flex items-center justify-center px-3 py-1 cursor-pointer"
                aria-label={play ? 'Pausar' : 'Reproduzir'}
            >
                {play ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="11" height="11" fill="#656565" />
                        <path d="M2.16071 0.785713C1.79604 0.785713 1.4463 0.930579 1.18844 1.18844C0.930579 1.4463 0.785713 1.79604 0.785713 2.16071V8.83928C0.785713 9.59828 1.40171 10.2143 2.16071 10.2143H3.33928C3.70396 10.2143 4.05369 10.0694 4.31156 9.81156C4.56942 9.55369 4.71428 9.20396 4.71428 8.83928V2.16071C4.71428 1.79604 4.56942 1.4463 4.31156 1.18844C4.05369 0.930579 3.70396 0.785713 3.33928 0.785713H2.16071Z" fill="#E3DCDC" />
                        <path d="M7.66071 0.785713C7.29604 0.785713 6.9463 0.930579 6.68844 1.18844C6.43058 1.4463 6.28571 1.79604 6.28571 2.16071V8.83928C6.28571 9.59828 6.90171 10.2143 7.66071 10.2143H8.83928C9.20396 10.2143 9.55369 10.0694 9.81156 9.81156C10.0694 9.55369 10.2143 9.20396 10.2143 8.83928V2.16071C10.2143 1.79604 10.0694 1.4463 9.81156 1.18844C9.55369 0.930579 9.20396 0.785713 8.83928 0.785713H7.66071Z" fill="#E3DCDC" />
                    </svg>
                ) : (
                    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25 4.76314L0 9.52628V0L8.25 4.76314Z" fill="#E3DCDC" />
                    </svg>
                )}
            </button>

            <div className="flex-1 min-w-0">
                <Marquee
                    speed={45}
                    gradient={false}
                    direction="left"
                    autoFill
                    play={play}
                    className="w-full"
                >
                    {ticker?.map((t, idx) => (
                        <div
                            key={idx}
                            className="shrink-0 px-4 py-1 border-r border-gray-400 flex items-center gap-3"
                        >
                            <span className="text-sm text-black font-medium">{t.nome}</span>
                            <span className="text-sm"> {t.valor}</span>
                            <span className={`text-sm font-medium ${t.var < 0 ? 'text-red-600' : 'text-[#149749]'}`}>
                                {t.var}%
                            </span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};
