/** @type {import('next').NextConfig} */
const nextConfig = {
  // ponytail: default is webp-only; avif is smaller for photos (hero bg,
  // press/blog art) and next/image already falls back to webp/original
  // per browser support, so this is a free size win with no risk.
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
