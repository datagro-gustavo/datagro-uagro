"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import i18n from "../utils/i18n";

export function useUrlLanguage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const lang = params?.lang;

  useEffect(() => {
    if (!lang) return;

    const map = {
      pt: "pt-BR",
      en: "en-US",
    };

    const target = map[lang] || "pt-BR";

    if (i18n.language !== target) {
      i18n.changeLanguage(target);
    }

    document.documentElement.lang = target;
  }, [lang]);

  const changeLangKeepingPath = (newLang) => {
    if (!pathname) return;

    const newPath = pathname.replace(/^\/[^/]+/, `/${newLang}`);
    router.replace(newPath);
  };

  return { lang, changeLangKeepingPath };
}
