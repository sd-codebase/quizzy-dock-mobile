const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for markdown-it module resolution issue
config.resolver.extraNodeModules = {
  'markdown-it': require.resolve('markdown-it'),
};

module.exports = config;
