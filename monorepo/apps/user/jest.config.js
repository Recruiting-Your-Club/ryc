module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|eot|ttf|otf)$': '<rootDir>/__mocks__/fileMock.js',

        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    },

    setupFiles: ['./jest.polyfills.js'],

    coverageDirectory: 'coverage',

    collectCoverageFrom: [
        '<rootDir>/src/components/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/src/**/*.d.ts', // TypeScript 타입 정의 파일 제외
        '!<rootDir>/src/index.tsx', // 엔트리 포인트 파일은 보통 제외 (선택 사항)
        '!<rootDir>/src/**/index.{js,jsx,ts,tsx}', // 각 컴포넌트 폴더 내의 index.tsx 제외 (선택 사항)
        '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}', // Storybook 파일 제외
        '!<rootDir>/src/**/*.style.{js,jsx,ts,tsx}', // 스타일 관련 파일 제외
        '!<rootDir>/src/**/__tests__/**', // 테스트 파일 자체는 커버리지 수집 대상에서 제외
        '!<rootDir>/src/**/*.mock.{js,jsx,ts,tsx}',
        '!<rootDir>/src/types/**',
        '!<rootDir>/src/mocks/**',
    ],

    // 커버리지 수집 활성화
    collectCoverage: true,
    // 커버리지 리포트 형식 지정
    coverageReporters: ['text'],

    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
