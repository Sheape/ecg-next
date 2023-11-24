/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    webpack: {
        nextRuntime: "edge"
    }
}

module.exports = nextConfig
