'use client'

import React, { use, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

/* COMPONENTS */
import RowSection from "../RowSection";

/* OUTHER COMPONENTS */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

/* CONTEXT */
import { NewsContext } from "@/context/news";

const SquareSkeleton = styled(Skeleton)`
  width: 296px !important;
  height: 166px !important;

  @media screen and (max-width:920px){
    width: 100% !important;
    height: 218px !important;
  }

  @media screen and (min-width: 1650px) {
    width: 360px !important;
    height: 218px !important;
  }
`;

const BoxSkeleton = styled.div`
  display: grid;
  padding: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 20px;
  margin-bottom: 1.5rem;

  @media screen and (max-width:920px){
    grid-template-columns: 1fr;
  }
`;

const LoadMoreButton = styled.button`
  margin: 40px auto;
  display: block;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #000;
  color: #fff;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Notices = ({page}) => {
  const router = useRouter()
  const [count, setCount] = useState(0)

  const {
    rowNotices,
    loadMoreRowNotices,
    hasMoreRows,
    loadingRows,
    setPageType
  } = useContext(NewsContext);

  const CHUNK_SIZE = 8;
  const chunks = [];


  for (let i = 0; i < rowNotices.length; i += CHUNK_SIZE) {
    chunks.push(rowNotices.slice(i, i + CHUNK_SIZE));
  }


  // const handleClickButton = () => {
  //   if(count == 2){
  //     router.push(`/notices/${12}`)
  //   }
  //   setCount(count + 1)
  // }


  
  useEffect(() => {
    setPageType(page)
  },[page])


  return (

    <section >
      <div className="flex flex-row justify-items-start px-6 md:px-12 pb-5 xl:max-w-7xl 2xl:max-w-412.5 mx-auto py-8">
        <h2 className="text-2xl md:text-3xl font-medium mb-2 ">Mais Notícias</h2>

      </div>
      {chunks.map((group, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <RowSection
            noticeProp={group}
            name={false}
            more={true}
            index={index}
          />
        </div>
      ))}


      {hasMoreRows && (
        <LoadMoreButton
          onClick={() => {loadMoreRowNotices()}}
          disabled={loadingRows}
        >
          {loadingRows ? "Carregando..." : "Mais notícias"}
        </LoadMoreButton>
      )}
    </section>
  );
};

export default Notices;
