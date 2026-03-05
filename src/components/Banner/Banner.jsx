'use client'

import React from 'react'
import b1 from '../../assets/banner.png';
import Image from 'next/image';


export const Banner = ({ props }) => {
  return (
    <div className={`${props} w-full flex justify-center items-center`}>
      <Image src={b1} className='w-[790px] ' alt='image' width={600} height={600} />
    </div>
  )
}
