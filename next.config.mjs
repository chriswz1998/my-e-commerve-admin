/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/drrxd8q4g/image/upload/**' // Cloudinary 资源的路径模式
      }
    ]
  }
}

export default nextConfig
