export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"], // opcional
      },
    ],
    sitemap: "https://augro.com.br/sitemap.xml",
  };
}