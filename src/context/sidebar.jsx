'use client'

import { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [dataFilter, setDataFilter] = useState([])
  const [data] = useState([
    {
      name: "A produtividade média da cana-de-açúcar teve redução significativa neste ciclo, reflexo das condições climáticas adversas e da menor eficiência na colheita mecanizada. O CTC aponta que, mesmo com o avanço da moagem, o rendimento segue abaixo do esperado.",
      image: "https://rehagro.com.br/blog/wp-content/uploads/2022/07/tecnica-boi-777.jpg"
    },
    {
      name: "O valor da arroba do boi gordo, considerando a praça-base do estado de São Paulo, segundo o Indicador do Boi DATAGRO, fechou, esta sexta-feira (10), com a média de R$ 307,33, alta de 0,03% na comparação com o dia útil anterior.",
      image: "https://terramagna.com.br/wp-content/uploads/2022/10/Trator-culturas-campo-agricola-entressafra.jpg"
    }
  ])

  const [sidebar, setSidebar] = useState('false')
  const [animation, setAnimation] = useState(false)

  const get = async (name) => {
    setAnimation(true)
    if (!name) {
      setDataFilter([])
      setAnimation(false)
      return false
    }
    const response = data.filter(item => item.name.includes(name))
    if (response.length > 0) {
      setDataFilter(response)
      setTimeout(() => {
        setAnimation(false)
      }, [1500])
    }

  }

  return (
    <SidebarContext.Provider value={{
      setSidebar,
      sidebar,
      dataFilter,
      get,
      animation
    }}>
      {children}
    </SidebarContext.Provider>
  );
}
