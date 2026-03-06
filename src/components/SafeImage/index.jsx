import React, { useState, useEffect } from "react";
import Image from "next/image";

export const SafeImage = ({ src, alt, className, isSectionNews = false }) => {
  const [currentSrc, setCurrentSrc] = useState(null);
  const [extensionIndex, setExtensionIndex] = useState(0);
  const [error, setError] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const extensions = ["jpg", "jpeg", "png"];

  const transformUrl = (url) => {
    if (!url) return null;

    // ✅ remove "undefined" e "NaN" se vierem na string
    const cleaned = String(url)
      .trim()
      .replace(/undefined/gi, "")
      .replace(/nan/gi, "")
      .replace(/NaN/gi, "");

    if (!cleaned) return null;

    const S3 = "https://s3-uagro.s3.amazonaws.com";
    const u = cleaned;

    const needle = "//noticias_img/";
    const idx = u.indexOf(needle);
    if (idx !== -1) {
      const tail = u.slice(idx + 2);
      return `${S3}/${tail.replace(/^\/+/, "")}`;
    }

    let pathname = u;
    try {
      pathname = new URL(u).pathname;
    } catch { }

    const wp = pathname.indexOf("/wp-content/");
    if (wp !== -1) {
      const after = pathname.slice(wp + "/wp-content/".length);
      return `${S3}/${after.replace(/^\/+/, "")}`;
    }

    if (pathname.startsWith("/")) return `${S3}${pathname}`;
    return `${S3}/${pathname}`;
  };


  useEffect(() => {
    if (!src) return;
    const baseUrl = transformUrl(src).replace(/\/wp-content\//g, "/");
    console.log("Transformed URL:", baseUrl);
    if (!baseUrl) return;

    const noExtension = baseUrl.replace(/\.(jpg|jpeg|png)$/i, "");

    setExtensionIndex(0);
    setCurrentSrc(`${noExtension}.${extensions[0]}`);
    setError(false);
  }, [src]);

  const handleError = () => {
    const baseWithoutExt = currentSrc.replace(/\.(jpg|jpeg|png)$/i, "");

    if (extensionIndex < extensions.length - 1) {
      const nextIndex = extensionIndex + 1;
      setExtensionIndex(nextIndex);
      setCurrentSrc(`${baseWithoutExt}.${extensions[nextIndex]}`);
    } else {
      // tentou todas extensões

      if (!usedFallback) {
        const replaced = baseWithoutExt.replace(
          "https://s3-uagro.s3.amazonaws.com",
          "https://publicador.uagro.com.br/wp-content"
        );

        setUsedFallback(true);
        setExtensionIndex(0);
        setCurrentSrc(`${replaced}.${extensions[0]}`);
      } else {
        setError(true);
      }
    }
  };

  if (!currentSrc || error) {
    return (
      <>
        {!isSectionNews ? (
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
            <div className="w-8 h-8 bg-neutral-300 rounded-sm" />
          </div>
        ) : (
          <>

          </>
        )
        }
      </>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={500}
      height={500}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
};
