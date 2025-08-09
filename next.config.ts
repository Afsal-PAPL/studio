
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pumpsandsystems.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'forteenergyservices.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pumpacademy.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.noria.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'movitherm.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aoblpump.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

    
