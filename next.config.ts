/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'paw-pal-api-9w4py.ondigitalocean.app',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'paw-pal-storage.fra1.digitaloceanspaces.com',
      },
      {
        hostname: 'paw-pal-api-4vhye.ondigitalocean.app',
        protocol: 'http',
      },
    ],
  },
};

export default nextConfig;
