'use client'

import React from 'react'

export const NoticiasSkeleton = ({
  h = 14,
  w = "100%",
  bg = "#1f2937",
  radius = 8,
  className = "",
  linhas = 1,
  ...rest
}) => {
  return (
    <div style={{
      backgroundColor: bg,
      height: typeof h === "number" ? `${h}px` : h,
      width: typeof w === "number" ? `${w}px` : w
    }}
      className='flex justify-center items-center'>

      {Array.from({ length: linhas }).map((_, i) => (
        <span
          role="status"
          aria-busy="true"
          className={`block animate-pulse ${className} h-5 w-full bg-gray-700`}
          style={{
            backgroundColor: "gray",          // use backgroundColor (não "background")
            borderRadius: typeof radius === "number" ? `${radius}px` : radius,
          }}
          {...rest}
        />
      ))}

    </div>

  );
};