import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { Global, ThemeProvider } from '@emotion/react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
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

function handleGlobalError(error: unknown) {
    if (error instanceof HttpError && error.statusCode === 500) {
        if (globalToast) {
            globalToast.error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.', {
                toastTheme: 'black',
                position: 'topCenter',
                duration: 5000,
            });
        }
    }
}

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            handleGlobalError(error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            handleGlobalError(error);
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

dayjs.locale('ko'); // dayjs를 한국기준으로 설정'

const Channeltalk = () => {
    ChannelService.loadScript();
    ChannelService.boot({
        pluginKey: `${process.env.CHANNEL_PLUGIN_KEY}`,
    });
    return () => {
        ChannelService.shutdown();
    };
};

async function initializeApp() {
    if (process.env.API_MOCKING === 'enabled') {
        await browserServer.start();
    }
    Channeltalk();
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
