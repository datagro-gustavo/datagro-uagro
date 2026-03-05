'use client'

import React from 'react'

import img from '../../assets/videoInsta.png';
import { Carrousel } from '../Carrousel';

export const Videos = ({ props }) => {
  
  const i = [
    { title: 'teste', img: img },
    { title: 'teste', img: img }, 
    { title: 'teste', img: img },
    { title: 'teste', img: img }, 
    { title: 'teste', img: img }, 
    { title: 'teste', img: img }, 
    { title: 'teste', img: img }
  ]

  return (
    <div className={`${props} p-1`}>
      <div className=''>
        <span className='text-2xl font-bold'>Vídeos</span>
      </div>

      <div className='h-full'>

        <Carrousel
          items={i}
          title="Vídeos"
          cardWidth={150}
          aspect="9/16"
          gap={18}
        />
      </div>
    </div>
  )
}
