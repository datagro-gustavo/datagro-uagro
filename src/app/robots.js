export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api","publicador.uagro.com.br"], // opcional
      },
    ],
    sitemap: "https://uagro.com.br/sitemap.xml",
  };
}