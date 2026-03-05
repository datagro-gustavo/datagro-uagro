'use client'

import React, { useContext } from "react";

import { ThemeContext } from "@/context/theme";

export const NoticeSecondary = () => {
    const { theme } = useContext(ThemeContext);

    const textColor = theme ? "text-[#18181B]" : "text-white";

    return (
        <div className="w-full mb-0">
            <p className={`font-metropolis text-lg font-regular mb-3 ${textColor}`}>
                Em relação aos indicadores econômicos do dia, o IBGE informou que o volume do setor de serviços do Brasil cresceu 0,1% em relação a julho e teve alta de 2,5% na comparação com o mesmo mês do ano anterior.
            </p>
            <p className={`font-metropolis text-lg font-regular mb-3 ${textColor}`}>
                No exterior, os investidores repercutiam o aumento das tensões entre os EUA e a China antes de conversas entre os dois países para buscar um acordo comercial durável. A China impôs hoje novas taxas portuárias adicionais de empresas de transporte marítimo ligada aos EUA, reacendendo as tensões comerciais.
            </p>
            <p className={`font-metropolis text-lg font-regular mb-3 ${textColor}`}>
                Enquanto isso, os investidores aguardam o discurso do presidente do Federal Reserve, Jerome Powell, marcado para às 13h20, o que deve dar novas dicas sobre a condução da política monetária norte-americana
            </p>
            <p className={`font-metropolis text-lg font-regular mb-0 ${textColor}`}>
                Paralelamente, a paralisação do governo dos EUA continua sem perspectiva de solução.
            </p>
            {/* <p className={`font-metropolis text-md font-regular mb-1 ${textColor}`}>
                Fonte: DATAGRO
            </p> */}
        </div>
    );
};
