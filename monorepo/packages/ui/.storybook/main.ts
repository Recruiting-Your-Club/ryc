import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        name: '@storybook/react-webpack5',
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
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][hash][ext][query]',
                },
            },
        ];
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@ssoc/assets': path.resolve(__dirname, '../../assets'),
                '@components': path.resolve(__dirname, '../src/components'),
                '@constants': path.resolve(__dirname, '../src/constants'),
                '@hooks': path.resolve(__dirname, '../src/hooks'),
            };
        }
        return config;
    },
};
export default config;
