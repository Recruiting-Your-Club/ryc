const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const packageJson = require('./package.json');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
        sentryWebpackPlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: 'ssoc',
            project: 'ssoc',
            bundleSizeOptimizations: {
                excludeDebugStatements: true,
                excludeReplayIframe: true,
                excludeReplayShadowDom: true,
            },
        }),
    ],
});
