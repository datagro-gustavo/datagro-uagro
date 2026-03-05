
/* OUTHER COMPONENTS */
import styled from "styled-components";

import Landing from "./landing/page";

export const metadata = {
  title: "Uagro | Notícias de Agricultura, Agronegócio e Mercado Rural",
  description:
    "Uagro é um portal de notícias sobre agricultura, agronegócio, mercado rural, clima, tecnologia no campo e economia agrícola no Brasil.",
  keywords: [
    "agricultura",
    "agronegócio",
    "notícias agrícolas",
    "mercado rural",
    "clima agrícola",
    "tecnologia no campo",
    "agro brasileiro",
    "Uagro"
  ],
  authors: [{ name: "Uagro" }],
  creator: "Uagro",
  publisher: "Uagro",
  openGraph: {
    title: "Uagro | Notícias de Agricultura e Agronegócio",
    description:
      "Acompanhe as principais notícias de agricultura, agronegócio, clima e mercado rural no UAgro.",
    url: "https://www.uagro.com.br", // ajuste se necessário
    siteName: "UAgro",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.uagro.com.br",
  },
};

export default function Home() {

  return (
    <Landing />
  );
}
