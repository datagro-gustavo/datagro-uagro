'use client'

import { useContext, useEffect, useMemo, useState } from "react";

import { ExchangeContext } from "@/context/exchange";



export const FormContractConverter = () => {
  const [bolsa, setBolsa] = useState("");
  const [mercadoriaKey, setMercadoriaKey] = useState("");
  const [moedaDestino, setMoedaDestino] = useState("");
  const [unidadeDestino, setUnidadeDestino] = useState("");
  const teste = [
    { Bolsa: "ICE", pt: "Açúcar #11", Moeda: "USD", Tipo: "P", Ud: "lb", Ativo: "SBH26", Nome: "SUGAR #11 MAR/6" },
    { Bolsa: "ICE", pt: "Açúcar #16", Moeda: "USD", Tipo: "P", Ud: "lb", Ativo: "SWH26", Nome: "SUGAR #16 MAR/6" },
    { Bolsa: "CME", pt: "Soja", Moeda: "USç", Tipo: "V", Ud: "bu", Ativo: "ZSF26", Nome: "SOYBEAN JAN/6" },
    { Bolsa: "B3", pt: "Soja", Moeda: "BRL", Tipo: "P", Ud: "60kg", Ativo: "SJH26", Nome: "SOJA MAR/6" },
  ];


  const moedas = ["USD", "BRL", "EUR"];
  const unidadesPeso = ["kg", "lb", "ton"];
  const unidadesVolume = ["bu", "m³"];


  const mercadoria = useMemo(() => {
    if (!bolsa || !mercadoriaKey) return null;
    return teste.find((mer) => mer.pt === mercadoriaKey) || null;
  }, [bolsa, mercadoriaKey]);

  const unidadesDestinoDisponiveis = useMemo(() => {
    if (!mercadoria) return [];
    return mercadoria.Tipo === "P" ? unidadesPeso : unidadesVolume;
  }, [mercadoria]);

  const moedaLabel = (m) => (m === "BRL" ? "R$" : m);

  const fmt = (n, dec = 2) =>
    Number(n).toLocaleString("pt-BR", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  const agora = useMemo(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
  }, [bolsa, mercadoriaKey, moedaDestino, unidadeDestino]);

  const precoOrigem = useMemo(() => {
    if (!mercadoria) return null;
    if (mercadoria.Ativo === "ZSF26") return 1082.25;
    return 75.12;
  }, [mercadoria]);

  const precoDestino = useMemo(() => {
    if (!mercadoria || !moedaDestino || !unidadeDestino || precoOrigem == null) return null;
    if (mercadoria.Moeda === "USç" && moedaDestino === "BRL" && unidadeDestino === "ton") return 123456.78;
    return precoOrigem * 4.31;
  }, [mercadoria, moedaDestino, unidadeDestino, precoOrigem]);



  const selectBase =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/25 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";

  const isFilled = Boolean(bolsa && mercadoria && moedaDestino && unidadeDestino && precoDestino != null);

  const { exchanges, contracts, get } = useContext(ExchangeContext);
  const [exchange, setExchange] = useState("");
  const [exchangeId, setExchangeId] = useState("");
  const [market, setMarket] = useState("");
  const [marketId, setMarketId] = useState("");


  useEffect(() => {
    get();
  }, [])



  const markets = useMemo(() => {
    if (!exchange) return null;

    return contracts?.filter(item => item.bolsa == exchangeId) || [];


  }, [exchangeId]);

  const handleChangeExchange = (e) => {
    setExchangeId(e.target.value);
    setMercadoriaKey("");
    setMoedaDestino("");
    setUnidadeDestino("");

    const selectedOption = e.target.selectedOptions[0];

    if (selectedOption) {
      setExchange(selectedOption.text);
    }

  }

  const handleChangeMarket = (e) => {
    setMarketId(e.target.value);

    const selectedOption = e.target.selectedOptions[0];
    if (selectedOption) {
      setMarket(selectedOption.text);
    }
  }

  const limpar = () => {
    setExchange("");
    setMarket("");
    setMoedaDestino("");
    setUnidadeDestino("");
  };




  return (
    <section className="w-full p-4 border  rounded-lg bg-white shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-700 text-center m-2">Bolsa</div>
          {!exchange ? (
            <div>
              <select
                value={exchange}
                onChange={handleChangeExchange}
                className={selectBase}
              >
                <option value="">Selecione...</option>
                {exchanges.map((exchange, i) => (
                  <option key={i} value={exchange.ID}>
                    {exchange.nome}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm text-slate-700">
              <span className="font-semibold">Bolsa:</span> {exchange}
            </div>
          )}

          {!market ? (
            <div>
              <div className="block text-sm font-semibold text-slate-700 mb-2">Mercadoria</div>
              <select
                value={market}
                disabled={!exchange}
                onChange={handleChangeMarket}
                className={selectBase}
              >
                <option value="">Selecione...</option>
                {markets?.map((contract, i) => (
                  <option key={i} value={contract.cod}>
                    {contract.nome}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm text-slate-700">
              <span className="font-semibold">Mercadoria:</span> {market}
            </div>
          )}
        </div>

        <div className="text-sm text-slate-700">
          <div className="text-sm font-semibold text-slate-700 text-center m-2">Contrato</div>
          <div className="font-semibold mb-2">Informação</div>
          {!market ? (
            <>
              <div className="text-slate-500">exemplo:</div>
              <div>0,01 USD / P</div>
            </>
          ) : (
            <>
              <div className="font-semibold">23</div>
              <div>R$/32</div>
            </>
          )}
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-700 text-center m-2">Converter para</div>
          <select
            value={moedaDestino}
            disabled={!mercadoria}
            onChange={(e) => setMoedaDestino(e.target.value)}
            className={selectBase}
          >
            <option value="">Selecione...</option>
            {moedas.map((m) => (
              <option key={m} value={m}>
                {moedaLabel(m)}
              </option>
            ))}
          </select>

          <div className="text-center text-sm text-slate-600">por</div>

          <select
            value={unidadeDestino}
            disabled={!mercadoria}
            onChange={(e) => setUnidadeDestino(e.target.value)}
            className={selectBase}
          >
            <option value="">Selecione...</option>
            {unidadesDestinoDisponiveis.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-slate-700">
          <div className="text-sm font-semibold text-slate-700 text-center m-2">Conversão</div>

          {!isFilled ? (
            <div className="space-y-2">
              <div>
                1 (moeda origem) = <span className="text-slate-500">x.xxxx</span> (moeda)
              </div>
              <div>
                1 (unidade origem) = <span className="text-slate-500">y.yyyyyy</span> (unidade destino)
              </div>
            </div>
          ) : (
            <>
              <div className="font-semibold">
                1 {mercadoria.Moeda}/{mercadoria.Ud} =
              </div>
              <div className="text-lg font-bold text-secondary">
                {fmt(precoDestino, 3)} {moedaLabel(moedaDestino)}/{unidadeDestino}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-600">
        {isFilled ? (
          <>
            Preço atual em {agora}: {fmt(precoOrigem, 2)} {mercadoria.Moeda}/{mercadoria.Ud} ={" "}
            {fmt(precoDestino, 2)} {moedaLabel(moedaDestino)}/{unidadeDestino}
          </>
        ) : (
          <>
            Preço atual em dd/mm hh:mm: xx.xx (unidade original) = yy.yy (unidade destino)
          </>
        )}
      </div>

      {isFilled && (
        <div className="mt-6 border-t pt-4">
          <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-slate-700">
            <div>Ativo</div>
            <div>Nome</div>
            <div>Data e Hora</div>
            <div className="text-right">{mercadoria.Moeda}/{mercadoria.Ud}</div>
            <div className="text-right">
              {moedaLabel(moedaDestino)}/{unidadeDestino}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 text-sm text-slate-700 mt-2">
            <div>{mercadoria.Ativo}</div>
            <div>{mercadoria.Nome}</div>
            <div>{agora}</div>
            <div className="text-right">{fmt(precoOrigem, 2)}</div>
            <div className="text-right">{fmt(precoDestino, 2)}</div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={limpar}
          className="w-44 rounded-md bg-secondary px-4 py-2 text-white text-sm font-semibold"
        >
          Limpar
        </button>
      </div>
    </section>
  );
};
