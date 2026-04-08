import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@agriguard/compliance-data"],
  experimental: {
    serverComponentsExternalPackages: ["@neondatabase/serverless"],
  },
}

export default nextConfig
