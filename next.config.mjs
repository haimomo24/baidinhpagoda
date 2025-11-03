// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // bạn có thể chỉnh thành 20mb, 50mb...
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "113.160.202.187",
        port: "1985",
        pathname: "/uploads/**", // Cho phép tất cả ảnh trong thư mục uploads
      },
    ],
  },
};

export default nextConfig;
