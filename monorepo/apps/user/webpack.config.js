const { createWebpackConfig } = require('@ryc/config/src/webpack/common');

module.exports = createWebpackConfig({
  entry: './src/index.tsx',
  appName: 'user',
  outputPath: 'dist',
  publicPath: '/'
});