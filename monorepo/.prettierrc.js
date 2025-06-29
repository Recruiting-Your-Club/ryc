module.exports = {
    printWidth: 100,
    singleQuote: true,
    semi: true,
    tabWidth: 4,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'auto',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: [
        '^@ssoc/(.*)$', // 내부 패키지들
        '^@/(.*)$', // 절대 경로
        '^[./]', // 상대 경로
    ],
    importOrderSortSpecifiers: true,
    importOrderSeparation: true,
    importOrderCaseInsensitive: true,
};
