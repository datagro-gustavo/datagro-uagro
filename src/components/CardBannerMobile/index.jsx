'use client'

import React from "react";
import styled from "styled-components";

const Clean = styled.div`
    height: 0.9rem;

`

const CardBannerMobile = ({ buttonName }) => {
  return (
    <div className="bg-secondary text-white rounded-md flex items-center justify-center px-2 py-1">
      <button className="font-metropolis text-[10px] leading-none font-medium text-center">
        {buttonName}
      </button>
    </div>
  );
};


export default CardBannerMobile