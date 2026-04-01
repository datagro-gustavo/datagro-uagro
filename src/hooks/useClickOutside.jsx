'use client'

import React, { useEffect } from 'react'

// Hook para fechar ou acionar eventos de cliques fora do componente ativo
export const useClickOutside = (ref, callback, enabled = false) => {

  useEffect(() => {
    if (!enabled) return;
    function handleClick() {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();

      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [ref, callback, enabled])
}
