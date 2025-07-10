import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-themes',
    ],
    framework: {
        name: '@storybook/react',
        options: {},
    },
    docs: {
        autodocs: true,
    },
    webpackFinal: async (config) => {
        // SVG 관련 설정 추가
        if (!config.module || !config.module.rules) {
            return config;
        }

        config.module.rules = [
            ...config.module.rules.map((rule) => {
                if (!rule || rule === '...') {
                    return rule;
                }

                if (rule.test && /svg/.test(String(rule.test))) {
                    return { ...rule, exclude: /\.svg$/i };
                }
                return rule;
            }),
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ];

        return config;
    },
};
export default config;
