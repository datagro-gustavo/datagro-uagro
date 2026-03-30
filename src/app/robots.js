export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"], // opcional
      },
    ],
    sitemap: "https://uagro.com.br/sitemap.xml",
  };
}