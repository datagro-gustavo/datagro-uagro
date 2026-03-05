'use client'

import { useEffect, useState } from "react";

import weight from '../../assets/icons/weight.svg'
import weightChecked from '../../assets/icons/weightChecked.svg'

import vol from '../../assets/icons/vol.svg'
import volChecked from '../../assets/icons/volChecked.svg'

import length from '../../assets/icons/length.svg'
import lengthChecked from '../../assets/icons/lengthChecked.svg'

import area from '../../assets/icons/area.svg'
import areaChecked from '../../assets/icons/areaChecked.svg'

import energy from '../../assets/icons/energy.svg'
import energyChecked from '../../assets/icons/energyChecked.svg'

import money from '../../assets/icons/money.svg'
import moneyChecked from '../../assets/icons/moneyChecked.svg'

import arrowDouble from '../../assets/icons/arrow-double.svg'
import arrowUpDouble from '../../assets/icons/arrow-up-double.svg'
import Image from "next/image";

export const FormUnitConverter = () => {
  const [category, setCategory] = useState("Peso");
  const [datas, setDatas] = useState([]);
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [fromamount, setFromAmount] = useState("");
  const [toamount, setToAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [resultado, setResultado] = useState("");




  const [categories] = useState([
    {
      category: 'Peso',
      img: weight,
      imgChecked: weightChecked,
      data: [
        { Código: "ST", en: "Short Tons", pt: "", valor: 1.10231131, HTML: "" },
        { Código: "T", en: "Metric Tons", pt: "Tonelada", valor: 1, HTML: "" },
        { Código: "LT", en: "Long Tons", pt: "", valor: 0.9842065, HTML: "" },
      ]
    },
    {
      category: 'Volume',
      img: vol,
      imgChecked: volChecked,
      data: [
        { Código: "G", en: "US Gallons", pt: "Galão", valor: 264.1716, HTML: "" },
        { Código: "IG", en: "Imperial Gallons", pt: "Galão", valor: 219.97040789, HTML: "" },
        { Código: "L", en: "Liters", pt: "Litro", valor: 1000, HTML: "" },
      ]
    },
    {
      category: 'Comprimento',
      img: length,
      imgChecked: lengthChecked,
      data: [
        { Código: "ML", en: "Miles", pt: "Milha", valor: 0.62136995, HTML: "" },
        { Código: "Y", en: "Yards", pt: "Jarda", valor: 1093.611112, HTML: "" },
        { Código: "F", en: "Feet", pt: "Pé", valor: 3280.833336, HTML: "" },
      ]
    },
    {
      category: 'Área',
      img: area,
      imgChecked: areaChecked,
      data: [
        { Código: "ML2", en: "Square Miles", pt: "Milha Quadrada", valor: 0.38610216, HTML: "" },
        { Código: "F2", en: "Square Feet", pt: "Pé Quadrado", valor: 10763910.4167097, HTML: "" },
        { Código: "A", en: "Acres", pt: "Acre", valor: 247.10540726, HTML: "" },
      ]
    },
    {
      category: 'Energia',
      img: energy,
      imgChecked: energyChecked,
      data: [
        { Código: "T", en: "Therms", pt: "", valor: 9.47816988, HTML: "" },
        { Código: "mmb", en: "mmBtus", pt: "", valor: 0.94781699, HTML: "" },
        { Código: "b", en: "Btus", pt: "", valor: 947816.98791344, HTML: "" },
      ]
    },
    {
      category: 'Moeda',
      img: money,
      imgChecked: moneyChecked,
      data: [
        { Código: "USD", en: "Dolars", pt: "Dólar", valor: "", HTML: "US$" },
        { Código: "BRL", en: "Reais", pt: "Real", valor: "", HTML: "R$" },
        { Código: "USDc", en: "Cents", pt: "Cents", valor: "", HTML: "&cents;" },
      ]
    },

  ]);

  useEffect(() => {
    setDatas(categories[0].data);

  }, [categories])

  const handleCategory = (cat) => {
    const data = categories.filter(item => item.category == cat)

    setCategory(cat);
    setDatas(data[0].data);

    setFromCode("");
    setToCode("");
    setAmount("");
    setResultado("");
  };

  const handleSwitchInputs = () => {
    if (!toamount || !fromamount) return;

    const tempFromCode = fromCode;
    const tempFromAmount = fromamount;

    setFromCode(toCode);
    setToCode(tempFromCode);

    setFromAmount(toamount);
    setToAmount(tempFromAmount);
  };


  const clearInputs = () => {
    setFromCode("");
    setToCode("");
    setAmount("");
    setResultado("");
  };

  const calcular = (type) => {
    setResultado(10);
    if (!fromCode || !toCode || amount === "") return;


  };

  const selectedFrom = datas.find(v => v.Código === fromCode);
  const selectedTo = datas.find(v => v.Código === toCode);

  useEffect(() => {

    setFromAmount(selectedFrom?.valor);
    setToAmount(selectedTo?.valor);

  }, [selectedFrom, selectedTo])



  return (
    <section className="flex flex-col gap-4 p-4 shadow-lg w-full max-w-3xl font-metropolis">
      <ul className="flex flex-wrap gap-4">
        {categories?.map(item => {
          return (
            <li key={item.category} className={`flex items-center  ${item.category === category ? 'text-secondary' : ''}`}>
              <button onClick={() => handleCategory(item.category)}>{item.category}</button> <Image   width={30} height={30} src={item.category === category ? item.imgChecked : item.img} alt="image" className="w-4 pl-1" />
            </li>
          );

        })}
      </ul>


      <div className="flex flex-col-reverse gap-5 justify-start sm:justify-center sm:items-center sm:flex-row">

        <div className="mb-4">
          <span className="block font-medium mb-1">De</span>
          <select
            value={fromCode}
            onChange={(e) => setFromCode(e.target.value)}
            className="border px-2 py-1 rounded-md w-52 focus-within:outline-2 focus-within:outline-secondary mb-1"
          >
            <option value="">Selecione...</option>
            {datas.map((v) => (
              <option key={v.Código} value={v.Código}>
                {v.pt ? `${v.pt} - ` : `${v.en} - `}{v.Código}
              </option>
            ))}
          </select>

          {selectedFrom && (
            <div className="mt-2 text-sm opacity-75">
              <input
                type="number"
                value={fromamount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="Valor"
                className="border px-2 py-1 rounded-md w-52 focus-within:outline-2 focus-within:outline-secondary  appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                [-moz-appearance:textfield]"
              />
            </div>
          )}
        </div>

        <div className="w-2/4 sm:w-full">
          <button className="bg-secondary w-10 h-10 text-white flex justify-center items-center p-2 rounded-full mx-auto" onClick={() => handleSwitchInputs()}>
            <Image  width={30} height={30} src={arrowDouble} alt="" className="hidden sm:block" />
            <Image  width={30} height={30} src={arrowUpDouble} alt="" className="block sm:hidden" />
          </button>
        </div>

        <div>
          <span className="block font-medium mb-1">Para</span>
          <select
            value={toCode}
            onChange={(e) => setToCode(e.target.value)}
            className="border px-2 py-1 rounded-md w-52 focus-within:outline-2 focus-within:outline-secondary"
          >
            <option value="">Selecione...</option>
            {datas.map((v) => (
              <option key={v.Código} value={v.Código}>
                {v.pt ? `${v.pt} - ` : `${v.en} - `}{v.Código}
              </option>
            ))}
          </select>
          {selectedTo && (
            <div className="mt-2 text-sm opacity-75">
              <input
                type="number"
                value={toamount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="Valor"
                className="border px-2 py-1 focus-within:outline-2 focus-within:outline-secondary rounded-md w-52 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                [-moz-appearance:textfield] "
              />
            </div>
          )}
        </div>

      </div>


      {resultado !== "" && (
        <p className="font-bold">Resultado: {resultado}</p>
      )}

      <div className="mt-2 font-metropolis">
        <button
          onClick={() => calcular(category)}
          className="bg-secondary text-[#303030] font-semibold p-1 rounded-md mr-2 "
        >
          Calcular
        </button>
        <button onClick={clearInputs}>Limpar</button>
      </div>
    </section>
  );
};
