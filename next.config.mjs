/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['via.placeholder.com', "images.pexels.com", "media.licdn.com", "dqy38fnwh4fqs.cloudfront.net", 'picsum.photos', 'bs-uploads.toptal.io', 'datawider.com', 'www.felixvemmer.com'],
    },
    allowedDevOrigins: ['http://192.168.1.8', 'http://192.168.1.8:3000', 'http://192.168.1.60:3000'],
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

