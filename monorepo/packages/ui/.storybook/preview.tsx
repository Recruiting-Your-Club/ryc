import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import theme, { globalStyles } from '@ssoc/styles';

export const decorators = [
    (Story) => (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyles} />
                <Story />
            </ThemeProvider>
        </BrowserRouter>
    ),
];
