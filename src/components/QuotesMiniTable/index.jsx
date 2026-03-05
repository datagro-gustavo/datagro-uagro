'use client'

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { PricesContext } from '@/context/prices';
import { SearchContext } from '@/context/search';
import { QuadrosContext } from '@/context/quadros';
import { formatDate } from '@/utils/formatDate';

export const QuotesTableMini = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [query, setQuery] = useState('');
  const { quotes } = useContext(PricesContext);
  const navigate = useNavigate();
  const { getQuotes, dataQuote } = useContext(SearchContext);
  const {quadroData, listQuadrosIds, setQuadroId} = useContext(QuadrosContext)
  const [selectedIndexMenu, setSelectedIndexMenu] = useState(0);

  const hrefQuote = (cod) => {
    navigate(`/quote/${cod}`);
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    getQuotes(value);
  };

  const handleClearSearch = () => {
    setQuery('');
    getQuotes('');
  };

  const toggleSearchBox = () => {
    if (searchBox) {
      handleClearSearch();
    }
    setSearchBox((prev) => !prev);
  };

  const handleSelectQuote = (item) => {
    if (item?.cod) {
      hrefQuote(item.cod);
      setSearchBox(false);
      handleClearSearch();
    }
  };

  return (
    <div className="w-full md:max-w-3xl bg-white">
      {/* Título + Busca (versão mais compacta) */}
      <div className="flex flex-col sm:flex-row mb-3">
        <h2 className="text-xl font-bold">Cotações</h2>

        <div className="flex items-center justify-end w-full relative mt-2 sm:mt-0">
          {/* Caixa de busca */}
          <div
            className={`
              mr-2 sm:mr-3
              overflow-visible
              origin-right
              transition-all duration-300
              flex items-center
              ${searchBox ? 'scale-x-100 opacity-100 w-full sm:w-64' : 'scale-x-0 opacity-0 w-0'}
            `}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Pesquisar ativo..."
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm pr-8"
                value={query}
                onChange={handleChangeSearch}
                autoFocus={searchBox}
              />

              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs hover:text-gray-600"
                  aria-label="Limpar busca"
                >
                  ✕
                </button>
              )}

              {(query || (dataQuote && dataQuote.length > 0)) && (
                <div className="absolute left-0 right-0 mt-1 bg-white max-h-56 z-50 overflow-y-auto shadow-lg border border-gray-200 rounded-md">
                  {dataQuote && dataQuote.length > 0 ? (
                    dataQuote.map((item, index) => (
                      <button
                        type="button"
                        key={item.cod || item.id || index}
                        onClick={() => handleSelectQuote(item)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm flex flex-col"
                      >
                        <span className="font-medium">
                          {item?.nome}
                        </span>
                        {item?.cod && (
                          <span className="text-xs text-gray-500">
                            Código: {item.cod}
                          </span>
                        )}
                        {item?.value && (
                          <span className="text-xs text-gray-500">
                            Último: {item.value}
                          </span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Nenhum ativo encontrado.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleSearchBox}
            aria-label={searchBox ? 'Fechar caixa de pesquisa' : 'Abrir caixa de pesquisa'}
            className="inline-flex items-center justify-center cursor-pointer p-1.5 rounded hover:bg-gray-100"
          >
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8726 10.9375L16.0634 13.75"
                stroke="#303030"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1813 6.875C14.1813 3.7684 11.3241 1.25 7.79962 1.25C4.27513 1.25 1.41797 3.7684 1.41797 6.875C1.41797 9.98163 4.27513 12.5 7.79962 12.5C11.3241 12.5 14.1813 9.98163 14.1813 6.875Z"
                stroke="#303030"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

<div className="flex-row mb-5 w-full border-b-2  font-metropolis font-semibold text-sm flex items-center gap-2">
				{/** MENU */}
				<div className='text-xl flex items-center gap-2'>
					{Object.values(listQuadrosIds).slice(0, 4).map((item, index) => (
						<button
							key={index}
							onClick={() => {setSelectedIndexMenu(index); setQuadroId(item.quadro)}}
							className={`
									  px-4 py-2 text-sm sm:text-base hover:border-b-4 hover:text-[#94C11F] transition-all
									  ${selectedIndexMenu === index ? 'border-b-4 text-[#94C11F] border-[#94C11F]' : ''}
									`}
						>
							{item.nome}
						</button>
					))}

					{Object.values(listQuadrosIds).length > 4 && (
						<div className="relative group">
							<button className="px-4 py-2 text-sm sm:text-base hover:border-b-4 hover:text-[#94C11F] transition-all">
								Mais ▼
							</button>
							<div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md hidden group-hover:block z-50">
								{Object.values(listQuadrosIds).slice(4).map((item, index) => (
									<button
										key={index + 4}
										onClick={() => {setSelectedIndexMenu(index + 4); setQuadroId(item.quadro)}}
										className={`
															w-full text-left px-4 py-2 text-sm hover:bg-gray-100
															${selectedIndexMenu === index + 4 ? 'bg-[#94C11F] text-white' : ''}
														`}
									>
										{item.nome}
									</button>
								))}
							</div>
						</div>
					)}
				</div>


			</div>
      {/* Apenas tabela (sem menu de categorias) */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="uppercase text-[11px] sm:text-xs border-b border-gray-200">
              <th className="py-2 px-3 text-left">Ativo</th>
              <th className="py-2 px-3 text-right">Último</th>
              <th className="py-2 px-3 text-right">Min</th>
              <th className="py-2 px-3 text-right">Max</th>
              <th className="py-2 px-3 text-right">Var. (%)</th>
              <th className="py-2 px-3 text-right">Data</th>
              <th className="py-2 px-3 text-right">Hora</th>
            </tr>
          </thead>
          <tbody>
            {quadroData.map((quote, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td
                  className="py-2 px-3 cursor-pointer"
                  onClick={() => hrefQuote(quote.cod)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm hover:underline">
                      {quote.cod}
                    </span>
                    {/* <span className="text-[11px] text-gray-500">
                      {quote.long}
                    </span> */}
                  </div>
                </td>

                <td className="py-2 px-3 text-right font-semibold">
                  {quote.value}
                </td>

                <td className="py-2 px-3 text-right">
                  <span>{quote.max}</span>
                </td>

                <td className="py-2 px-3 text-right">
                  <span>{quote.min}</span>
                </td>

                <td
                  className={`py-2 px-3 text-right ${
                    quote.var >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <div className="relative flex items-center justify-end gap-1">
                    <span className="pl-4">{quote.var}%</span>
                  </div>
                </td>

                <td className="py-2 px-3 text-right">
                  {formatDate(quote.date)}
                </td>
                <td className="py-2 px-3 text-right">{quote.hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
