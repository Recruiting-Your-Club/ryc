module.exports = {
    printWidth: 100,
    singleQuote: true,
    semi: true,
    tabWidth: 4,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'auto',
    importOrder: [
        '^@ryc/(.*)$',           // 내부 패키지들
        '^@/(.*)$',              // 절대 경로
        '^[./]'                  // 상대 경로
      ],
    importOrderSortSpecifiers: true,
    //plugins: ['@trivago/prettier-plugin-sort-imports']
};
