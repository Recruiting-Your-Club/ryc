import { BASE_URL } from '@constants/api';

export const isAuthEndpoint = (rawUrl: string) => {
    const url = new URL(rawUrl, BASE_URL);
    const pathname = url.pathname;
    return (
        pathname.startsWith('/auth/login') ||
        pathname.startsWith('/auth/logout') ||
        pathname.startsWith('/auth/refresh-token')
    );
};
