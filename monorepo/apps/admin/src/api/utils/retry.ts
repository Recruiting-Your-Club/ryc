import { HttpError } from '@api/common/httpError';
import type { InternalRetryableOption } from '@api/common/types';
import { useAuthStore } from '@stores/authStore';

import { isAuthEndpoint } from './checkEndpoint';

export const getStatusCode = (error: unknown): number | undefined => {
    if (error instanceof HttpError) {
        return error.statusCode;
    }
    return undefined;
};

export const shouldAttemptRefresh = (
    status: number | undefined,
    option: InternalRetryableOption,
): boolean => {
    if (status !== 401) return false;
    if (!('isAuthRequire' in option) || !option.isAuthRequire) return false;
    if (option.retried) return false;
    if (isAuthEndpoint(option.url)) return false;
    return true;
};

export const tryRefreshAccessToken = async (): Promise<string | null> => {
    return useAuthStore.getState().bootstrap();
};

export const autoLogout = async (): Promise<void> => {
    await useAuthStore.getState().logout?.('SESSION_EXPIRED');
};
