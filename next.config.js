/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    serverRuntimeConfig: {
        runtime: 'edge'
    }
}

module.exports = nextConfig
