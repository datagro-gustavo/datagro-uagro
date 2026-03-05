/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  assetPrefix: "/uagro-next",
  basePath: "/uagro-next",
  images: {
    path: "/uagro-next/_next/image",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datagro.imgix.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'assets.datagro.com',
        pathname: '/**',
      },

      {
        protocol:"https",
        hostname:"s3-uagro.s3.amazonaws.com",
        pathname:"/**"
      }

    ],
  },
};

export default nextConfig;
