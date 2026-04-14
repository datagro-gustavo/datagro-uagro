'use client'

import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NewsContext } from "@/context/news";
import { BannersContext } from "@/context/banners";
import RowSection from "../RowSection";

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

const BannerWrapper = styled.div`
  padding: 0 1.5rem;
  margin: 0 auto 40px auto;
  max-width: 1280px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
`;

const Notices = ({ page }) => {
  const [loadClicks, setLoadClicks] = useState(0);

  const {
    rowNotices,
    loadMoreRowNotices,
    hasMoreRows,
    loadingRows,
    setPageType
  } = useContext(NewsContext);

  const { get, getBannerPositionInfo } = useContext(BannersContext);

  const CHUNK_SIZE = 8;
  const chunks = [];

  for (let i = 0; i < rowNotices.length; i += CHUNK_SIZE) {
    chunks.push(rowNotices.slice(i, i + CHUNK_SIZE));
  }

  useEffect(() => {
    setPageType(page);
  }, [page, setPageType]);

  useEffect(() => {
    get(4);
  }, [get]);

  const dynamicBannerPosition = getBannerPositionInfo(4);
  const dynamicBanners = dynamicBannerPosition?.banners || [];

  const getBannerByClickIndex = (clickIndex) => {
    if (!dynamicBanners.length) return null;
    return dynamicBanners[clickIndex % dynamicBanners.length];
  };

  const handleLoadMore = async () => {
    await loadMoreRowNotices();
    setLoadClicks((prev) => prev + 1);
  };

  return (
    <section>
      <div className="flex flex-row justify-items-start px-6 md:px-12 pb-5 xl:max-w-7xl 2xl:max-w-412.5 mx-auto py-8">
        <h2 className="text-2xl md:text-3xl font-medium mb-2">Mais Notícias</h2>
      </div>

      {chunks.map((group, index) => {
        const shouldShowBanner = index === 0 || (index > 0 && index <= loadClicks);
        const banner = shouldShowBanner ? getBannerByClickIndex(index) : null;

        return (
          <React.Fragment key={index}>
            <div style={{ marginBottom: "40px" }}>
              <RowSection
                noticeProp={group}
                name={false}
                more={true}
                index={index}
              />
            </div>

            {banner && (
              <BannerWrapper>
                <BannerImage
                  src={banner.imageUrl}
                  alt={banner.name || "Banner"}
                />
              </BannerWrapper>
            )}
          </React.Fragment>
        );
      })}

      {hasMoreRows && (
        <LoadMoreButton
          onClick={handleLoadMore}
          disabled={loadingRows}
        >
          {loadingRows ? "Carregando..." : "Mais notícias"}
        </LoadMoreButton>
      )}
    </section>
  );
};

export default Notices;