/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/drrxd8q4g/image/upload/**' // Cloudinary 资源的路径模式
      },
      {
        protocol: 'https',
        hostname: 'myimagesforbtym.blob.core.windows.net',
        pathname: '/images/**' // Adjust path pattern as needed
      }
    ]
  }
}

export default nextConfig
