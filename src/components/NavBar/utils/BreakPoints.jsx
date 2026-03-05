'use client'

import { useEffect, useState } from "react";

const MQ = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
};

export function useBreakpoint() {
  const [bp, setBp] = useState("base");

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mqls = {
      sm: window.matchMedia(MQ.sm),
      md: window.matchMedia(MQ.md),
      lg: window.matchMedia(MQ.lg),
      xl: window.matchMedia(MQ.xl),
    };

    const definirTamanho = () => {
      if (mqls.xl.matches) setBp("xl");
      else if (mqls.lg.matches) setBp("lg");
      else if (mqls.md.matches) setBp("md");
      else if (mqls.sm.matches) setBp("sm");
      else setBp("base");
    };

    const add = (mql, h) => {
      if ("addEventListener" in mql) mql.addEventListener("change", h);
      else mql.addListener && mql.addListener(h); // Safari antigo
    };
    const remove = (mql, h) => {
      if ("removeEventListener" in mql) mql.removeEventListener("change", h);
      else mql.removeListener && mql.removeListener(h);
    };

    Object.values(mqls).forEach((m) => add(m, definirTamanho));
    definirTamanho(); // calcula na montagem

    return () => Object.values(mqls).forEach((m) => remove(m, definirTamanho));
  }, []);

  return bp;
}
