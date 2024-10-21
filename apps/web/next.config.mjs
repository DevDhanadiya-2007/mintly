/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.cache = {
            type: 'filesystem',
            cacheDirectory: path.resolve(__dirname, '.next/cache'),
            buildDependencies: {
                config: [__filename],
            },
        };

        return config;
    },
};

export default nextConfig;
