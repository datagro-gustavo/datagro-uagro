'use client'

import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "@/context/theme";

export const RelationalSubjects = () => {
  const { theme } = useContext(ThemeContext);

  const Button = styled.button`
    margin-top: 1rem;
    width: 82px;
    background-color: #1D2E03;
    color: #FFFFFF;
  `;

  const textColor = theme ? "text-[#18181B]" : "text-white";

  return (
    <div className="mb-10">
      <p className={`font-metropolis text-md font-bold ${textColor}`}>
        Assuntos relacionados
      </p>
      <div className="flex">
        <Button className="mr-2">Economia</Button>
        <Button>Política</Button>
      </div>
    </div>
  );
};
