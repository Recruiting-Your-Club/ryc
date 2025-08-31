import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { Global, ThemeProvider } from '@emotion/react';
import * as Sentry from '@sentry/react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { globalStyles } from '@ssoc/styles';
import theme from '@ssoc/styles';
import { ToastProvider, useToast } from '@ssoc/ui';

import { HttpError } from './api/common/httpError';
import App from './App';
import { browserServer } from './mocks/server/browser';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalToast: any = null;

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // 성능 모니터링을 위한 설정
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
    // 프로덕션 환경에서만 Sentry를 활성화
    enabled: process.env.NODE_ENV === 'production',
});
Sentry.setTag('domain', '유저');

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            throw error;
        },
    }),
});

function ToastManager() {
    const { toast } = useToast();

    useEffect(() => {
        globalToast = toast;
        return () => {
            globalToast = null;
        };
    }, [toast]);

    return null;
}
dayjs.locale('ko'); // dayjs를 한국기준으로 설정

const Channeltalk = async () => {
    ChannelService.loadScript();
    ChannelService.boot({
        pluginKey: `${process.env.CHANNEL_PLUGIN_KEY}`,
    });
    return () => {
        ChannelService.shutdown();
    };
};

async function initializeApp() {
    // 개발 환경에서 MSW 활성화
    if (process.env.API_MOCKING === 'enabled') {
        await browserServer.start();
    }
    await Channeltalk();
    root.render(
        <React.StrictMode>
            <Global styles={globalStyles} />
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider limit={5}>
                        <ToastManager />
                        <App />
                    </ToastProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </React.StrictMode>,
    );
}

initializeApp();
