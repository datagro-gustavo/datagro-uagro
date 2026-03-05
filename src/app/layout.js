import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import { InstagramProvider } from "@/context/instagram";
import { AnalysisProvider } from "@/context/analysis";
import { ModalProvider } from "@/context/modal";
import { SidebarProvider } from "@/context/sidebar";
import { ColumnProvider } from "@/context/column";
import { PricesProvider } from "@/context/prices";
import { QuadrosProvider } from "@/context/quadros";
import { ExchangeProvider } from "@/context/exchange";
import { AuthProvider } from "@/context/auth";
import { SearchProvider } from "@/context/search";
import { NewsProvider } from "@/context/news";
import { VideosProvider } from "@/context/videos";
import { ConfigProvider } from "@/context/config_api";
import { TagsProvider } from "@/context/tags";
import localFont from "next/font/local";
import { Lora } from 'next/font/google';
import { MattersProvider } from "@/context/matters";

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});


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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${lora.variable}  `}
      >
        <ConfigProvider>
          <MattersProvider>
          <TagsProvider>
            <NewsProvider>
              <ThemeProvider>
                <VideosProvider>
                  <PricesProvider>
                    <AuthProvider>
                      <SearchProvider>
                        <ColumnProvider>
                          <AnalysisProvider>
                            <ExchangeProvider>
                              <QuadrosProvider>
                                <ModalProvider>
                                  <SidebarProvider>
                                    <InstagramProvider>
                                      {children}
                                    </InstagramProvider>
                                  </SidebarProvider>
                                </ModalProvider>
                              </QuadrosProvider>
                            </ExchangeProvider>
                          </AnalysisProvider>
                        </ColumnProvider>
                      </SearchProvider>
                    </AuthProvider>
                  </PricesProvider>
                </VideosProvider>
              </ThemeProvider>
            </NewsProvider>
          </TagsProvider>
          </MattersProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}


