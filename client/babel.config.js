module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true, // 브라우저 최신 버전에 맞춰서 빌드할 수 있도록 함
                },
            },
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic', // import react안해도되게함
            },
        ],
        ['@babel/preset-typescript'], // 타입스크립트 문법 제거해줌
        ['@emotion/babel-preset-css-prop'], // react dom 속성에 css가 없는데 babel이 이를 만들어주고 className을 랜덤으로 만들어줌
    ],
    comments: false, // 주석 제거
};
