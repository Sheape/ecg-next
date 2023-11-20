/** @type {import('next').NextConfig} */
const nextConfig = {
      eslint: {
      ignoreDuringBuilds: true
},
    typescript: {
    ignoreBuildErrors: true
    },
    serverRuntimeConfig: {
    runtime: 'nodejs'
    }
}

module.exports = nextConfig
