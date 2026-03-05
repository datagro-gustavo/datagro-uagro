"use client";

import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

const STORAGE_KEY = "@afb3845d-0f3d-4559-91ae-1248233c9788";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => setTheme((v) => !v);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) setTheme(saved === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, String(theme));
    document.documentElement.classList.toggle("dark", theme);
  }, [theme, mounted]);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  if (!mounted) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
