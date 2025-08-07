/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:slug.html',
                destination: '/app/:slug',
              },
        ]
    }
};

export default nextConfig;
