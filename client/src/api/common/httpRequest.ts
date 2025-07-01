import { httpClient } from './httpClient';
import type { RequestOption } from './types';
import type { HttpMethod } from './types';

const httpRequest = {
    request<T>(method: HttpMethod, { ...option }: RequestOption): Promise<T>{
        const data = httpClient.createHttpRequest({
            method,
            ...option,
        }).then((response) => httpClient.handleResponse<T>(response));
        return data;
    },

    get<T>({ url, headers, isAuthRequire }: RequestOption): Promise<T> {
        return this.request('GET', { url, headers, isAuthRequire });
    },
    post<T>({ url, headers, body, isAuthRequire }: RequestOption): Promise<T> {
        return this.request('POST', { url, headers, body, isAuthRequire });
    },
    put<T>({ url, headers, body, isAuthRequire }: RequestOption): Promise<T> {
        return this.request('PUT', { url, headers, body, isAuthRequire });
    },
    delete<T>({ url, headers, isAuthRequire }: RequestOption): Promise<T> {
        return this.request('DELETE', { url, headers, isAuthRequire });
    },
    patch<T>({ url, headers, body, isAuthRequire }: RequestOption): Promise<T> {
        return this.request('PATCH', { url, headers, body, isAuthRequire });
    },
};

export { httpRequest };
