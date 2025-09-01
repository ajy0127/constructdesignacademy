/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for S3/CloudFront
  output: 'export',
  
  // Ensure trailing slashes for S3 compatibility
  trailingSlash: true,
  
  // Image optimization settings
  images: {
    unoptimized: true,
    domains: ['localhost', 'constructdesignacademy.com'],
  },
  
  // Turbopack configuration (moved from experimental)
  turbo: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://constructdesignacademy.com',
  },
  
  // Webpack configuration
  webpack: (config) => {
    // Add any necessary webpack configurations here
    return config;
  }
};

module.exports = nextConfig;