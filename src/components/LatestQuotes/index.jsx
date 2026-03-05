'use client'

import React, { useContext } from 'react'

import { PricesContext } from '@/context/prices';

export const LatestQuotes = () => {

    const { miniQuotes } = useContext(PricesContext);
    return (
        <div className="flex w-full justify-center">
            <div className="bg-[#303030] w-full max-w-md md:max-w-xl flex items-center justify-between px-6 py-3 rounded-xl">
                {miniQuotes?.map((quote, index) => (
                    <div
                        key={index}
                        className={`
                        flex flex-col items-center justify-center flex-1
                        ${index > 0 ? 'border-l border-white/30' : ''}`}>
                        <span className="text-sm uppercase tracking-wide font-semibold text-white">
                            {quote.name}
                        </span>

                        <span
                            className={`
                                mt-1 inline-flex items-center gap-1 text-md font-semibold
                                ${quote.var >= 0 ? 'text-[#2ECC71]' : 'text-[#FF4C4C]'}
                            `}
                        >
                            {quote.var >= 0 ? (
                                <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M19 16H5L12 5L19 16Z" fill="#2ECC71" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 8H19L12 19L5 8Z" fill="#FF4C4C" />
                                </svg>
                            )}
                            {quote.var}%

                        </span>

                        <span className="mt-1 text-sm font-semibold text-white">
                            {quote.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>

    )

}
