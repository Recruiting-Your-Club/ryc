import React from 'react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
    <Global
        styles={css`
            body {
                font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
        `}
    />
);

export const decorators = [
    withThemeFromJSXProvider({
        GlobalStyles, // 모든 스토리에 GlobalStyles 적용
    }),
];
