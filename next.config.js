// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net', 'localhost'],
  },
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB'
  },
  reactStrictMode: true,
  webpack: (config) => {
    if (!config.experiments) {
      config.experiments = {};
    }
    config.experiments.topLevelAwait = true;
    return config;
  }
}

module.exports = nextConfig