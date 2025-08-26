// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // bạn có thể chỉnh thành 20mb, 50mb...
    },
  },
}

export default nextConfig
