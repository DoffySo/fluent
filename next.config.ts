import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.vercel.com',
                pathname: '/image/upload/**',
            },
        ],
    },
};

export default nextConfig;
