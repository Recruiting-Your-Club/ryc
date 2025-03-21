import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import theme from '../src/styles/theme';
import global from '../src/styles/global';

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Global styles={global} />
            <Story />
        </ThemeProvider>
    ),
];
