/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'xpa-storage.s3.amazonaws.com'],
  },
  // Enable AWS Amplify SSR support
  transpilePackages: ['@aws-amplify/ui-react'],
}

module.exports = nextConfig
