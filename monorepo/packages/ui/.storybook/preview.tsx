import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import theme from '@ssoc/styles';
import { global } from '@ssoc/styles';

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
