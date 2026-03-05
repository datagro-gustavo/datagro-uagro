
'use client'

import Image from "next/image";

export const MiniCards = ({ imagem, categoria, titulo, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left hover:border-gray-300 transition
                 flex gap-3 bg-white"
    >
      {/* Thumb pequena, cantos arredondados */}
      <div className="shrink-0">
        <Image
          src={imagem}
          alt={titulo}
          width={30} height={30}
          className="h-24 w-24 object-cover"
          loading="lazy"
        />
      </div>

      {/* Texto */}
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-gray-500 mb-1">
          {categoria}
        </span>
        <h3 className="text-md font-bold leading-snug line-clamp-3">
          {titulo}
        </h3>
      </div>
    </button>
  );
};
