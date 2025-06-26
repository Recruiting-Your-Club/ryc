import { ToastProvider } from '@components/Toast/ToastProvider';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from '@styles/global';
import theme from '@styles/theme';
import dayjs from 'dayjs';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
dayjs.locale('ko'); // dayjs를 한국기준으로 설정
root.render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
            <ToastProvider limit={5}>
                <App />
            </ToastProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
