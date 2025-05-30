/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['via.placeholder.com', "images.pexels.com", "media.licdn.com", "dqy38fnwh4fqs.cloudfront.net", 'picsum.photos', 'bs-uploads.toptal.io', 'datawider.com', 'www.felixvemmer.com'],
    },
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.1.60']
};

export default nextConfig;
 
