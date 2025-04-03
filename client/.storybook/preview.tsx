import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import theme from '../src/styles/theme';
import global from '../src/styles/global';
import { BrowserRouter } from 'react-router-dom';

export const decorators = [
    (Story) => (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Global styles={global} />
                <Story />
            </ThemeProvider>
        </BrowserRouter>
    ),
];
