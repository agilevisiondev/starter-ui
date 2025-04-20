/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "assets.aceternity.com", "nextjs-sj.netlify.app"],
  },
}

export default nextConfig
