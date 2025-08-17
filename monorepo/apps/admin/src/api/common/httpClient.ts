import { BASE_URL } from '@constants/api';
import { useAuthStore } from '@stores/authStore';

import { HttpError } from './httpError';
import type { CreateClientOptions } from './types';

const httpClient = {
    async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let errorData: any; // Response객체의 json() 메서드가 실패할 경우 any로 반환하여 any로 설정
            try {
                errorData = await response.json();
            } catch (jsonError) {
                errorData = await response.text().catch(() => '알 수 없는 에러가 발생하였습니다.');
            }
            throw new HttpError(
                response.status,
                errorData.message || 'HTTP 에러가 발생하였습니다.',
                errorData,
            );
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json() as Promise<T>;
        }
        return {} as T; // JSON이 아닌 경우 빈 객체 반환
    },

    async createHttpRequest({ method, url, headers, body, isAuthRequire }: CreateClientOptions) {
        const fullUrl = new URL(url, BASE_URL).toString();
        const { accessToken } = useAuthStore.getState();

        const authHeaders = new Headers(headers);

        authHeaders.set('Content-Type', 'application/json');

        if (accessToken && isAuthRequire) {
            authHeaders.set('Authorization', `Bearer ${accessToken}`);
        }

        const response = await fetch(fullUrl, {
            method: method,
            headers: authHeaders,
            body: body ? JSON.stringify(body) : null, // body가 object -> null 대입
            credentials: isAuthRequire ? 'include' : 'omit',
        });
        return response;
    },
};

export { httpClient };
