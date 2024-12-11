/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "cdn.buymeacoffee.com",
            }
        ]
    },
    reactStrictMode: false,
};

export default nextConfig;
