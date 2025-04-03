const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        //NOTE : 나중에 서버에서 하위경로인 manager는 따로 설정해줘야함
        historyApiFallback: {
            index: '/index.html',
        },
    },
});
