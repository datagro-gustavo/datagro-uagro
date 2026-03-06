/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datagro.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.datagro.com',
      },
      {
        protocol: "https",
        hostname: "s3-uagro.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "publicador.uagro.com.br",
      },
    ],
  },
};

export default nextConfig;