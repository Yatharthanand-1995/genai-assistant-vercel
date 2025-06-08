import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Handle Node.js polyfills for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        assert: false,
        http: false,
        https: false,
        url: false,
        zlib: false,
      };
    }
    
    // Exclude problematic packages from edge runtime
    config.externals = config.externals || [];
    config.externals.push({
      'fs': 'commonjs fs',
      'path': 'commonjs path',
      'stream': 'commonjs stream',
    });

    return config;
  },
  serverExternalPackages: [],
};

export default nextConfig;
