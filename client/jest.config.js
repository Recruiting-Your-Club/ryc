module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
        '^@components$': '<rootDir>/src/components/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    },

    setupFiles: ['./jest.polyfills.js'],

    coverageDirectory: 'coverage',

    collectCoverageFrom: [
        'src/components/*.{ts,tsx,js,jsx}',
        'src/pages/*.{ts,tsx,js,jsx}',
        '!src/**/*.d.ts', // 타입 정의 파일 제외
        '!src/**/*.test.{ts,tsx,js,jsx}', // 테스트 파일 자체 제외
        '!src/**/*.types.{ts,tsx,js,jsx}', // 타입 파일 자체 제외
        '!src/**/*.stories.{ts,tsx,js,jsx}', // 스토리북 파일 자체 제외
        '!src/**/*.style.{ts,tsx,js,jsx}', // 스타일 파일 자체 제외
        '!src/**/index.{ts,tsx,js,jsx}', // index 파일 자체 제외
        '!src/**/__tests__/**', // __tests__ 디렉토리 아래 파일 제외
    ],

    // 커버리지 수집 활성화
    collectCoverage: true,
    // 커버리지 리포트 형식 지정
    coverageReporters: ['text'],

    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
