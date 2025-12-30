/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60, // Cache images for 60 seconds
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  compress: true, // Enable gzip compression

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
  },

  // Reduce bundle size by optimizing imports
  experimental: {
    optimizePackageImports: ['@fortawesome/react-fontawesome'],
  },

  // Output mode for production (standalone for better containerization)
  output: 'standalone',

  // Memory-efficient settings for 2GB RAM
  webpack: (config, { dev, isServer }) => {
    // Reduce memory usage during build
    config.cache = {
      type: 'filesystem',
      maxAge: 1000 * 60 * 60, // 1 hour cache
    };

    // Optimize for smaller bundles
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const match = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (match) {
                const packageName = match[1];
                return `npm.${packageName.replace('@', '')}`;
              }
              return 'lib';
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
            enforce: true,
          },
          shared: {
            name(module, chunks) {
              const allChunksNames = chunks.map((c) => c.name).join('|');
              return `shared (${allChunksNames})`;
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;