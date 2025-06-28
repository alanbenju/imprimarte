const nextConfig = {
  images: {
    domains: ["storage.googleapis.com"],
  },
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: [
      "@mikro-orm/core",
      "@mikro-orm/postgresql",
      "@mikro-orm/migrations",
      "@mikro-orm/reflection",
      "@ts-morph/common"
    ],
  },
  webpack: (config, { isServer }) => {
    // Handle canvas module issues
    config.resolve.alias = {
      ...config.resolve.alias,
      // Replace problematic canvas module with our shim
      canvas: isServer 
        ? require.resolve("./src/app/module-shims.js")
        : false // Client-side doesn't need canvas
    };
    
    // Properly handle server-only modules
    if (!isServer) {
      // Don't attempt to bundle these server-only packages on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@mikro-orm/core": false,
        "@mikro-orm/postgresql": false,
        "@mikro-orm/migrations": false,
        "@mikro-orm/reflection": false,
        "@rushstack/node-core-library": false,
        "@rushstack/terminal": false,
        "@rushstack/ts-command-line": false,
        "umzug": false,
        "source-map-support": false,
        "ts-morph": false,
        "@ts-morph/common": false,
        "jju": false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig; 