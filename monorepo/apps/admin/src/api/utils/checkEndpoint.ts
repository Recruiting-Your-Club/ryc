import { BASE_URL } from '@constants/api';

export const isAuthEndpoint = (rawUrl: string) => {
    return rawUrl === 'auth/login' || rawUrl === 'auth/logout' || rawUrl === 'auth/refresh-token';
};
