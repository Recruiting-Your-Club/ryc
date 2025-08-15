import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { globalStyles } from '@ssoc/styles';
import theme from '@ssoc/styles';
import { ToastProvider } from '@ssoc/ui';
import 'dayjs/locale/ko';
import App from './App';
import { browserServer } from './mocks/server/browser';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();
dayjs.locale('ko'); // dayjs를 한국기준으로 설정

async function initializeApp() {
    // 개발 환경에서 MSW 활성화
    if (process.env.API_MOCKING === 'enabled') {
        await browserServer.start();
    }
    root.render(
        <React.StrictMode>
            <Global styles={globalStyles} />
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider limit={5}>
                        <App />
                    </ToastProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </React.StrictMode>,
    );
}

initializeApp();
