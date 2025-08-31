const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SentryCliPlugin } = require('@sentry/webpack-plugin');
const packageJson = require('./package.json');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
        new SentryCliPlugin({
            include: './dist', // 소스맵이 있는 디렉토리
            ignore: ['node_modules', 'webpack.*.js'],
            configFile: '.sentryclirc',
            release: `user@${packageJson.version}`, // package.json 버전과 연동
        }),
    ],
});
