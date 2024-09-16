/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        fontLoaders: [
            {
                loader: 'next-fonts',
                options: {
                    // Opciones para next-fonts
                },
            },
        ],
    },
};

export default nextConfig;
