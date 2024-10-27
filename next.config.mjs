/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        
        
      },
      {
        protocol: "https",
        hostname: "openweathermap.org"
      }
    ],
  },
  
};


export default nextConfig;
