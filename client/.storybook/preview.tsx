import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import global from '../src/styles/global';
import theme from '../src/styles/theme';

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Global styles={global} />
            <Story />
        </ThemeProvider>
    ),
];
