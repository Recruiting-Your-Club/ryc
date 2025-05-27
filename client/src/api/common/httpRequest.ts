import { httpClient } from './httpClient';
import type { requestOption } from './types';

const httpRequest = {
    get<T>({ url, headers, isAuthRequire }: requestOption): Promise<T> {
        const data = httpClient
            .createHttpRequest({
                method: 'GET',
                url,
                headers,
                isAuthRequire,
            })
            .then(httpClient.handleResponse<T>);
        return data;
    },
    post<T>({ url, headers, body, isAuthRequire }: requestOption): Promise<T> {
        const data = httpClient
            .createHttpRequest({
                method: 'POST',
                url,
                headers,
                body,
                isAuthRequire,
            })
            .then(httpClient.handleResponse<T>);
        return data;
    },
    put<T>({ url, headers, body, isAuthRequire }: requestOption): Promise<T> {
        const data = httpClient
            .createHttpRequest({
                method: 'PUT',
                url,
                headers,
                body,
                isAuthRequire,
            })
            .then(httpClient.handleResponse<T>);
        return data;
    },
    delete<T>({ url, headers, isAuthRequire }: requestOption): Promise<T> {
        const data = httpClient
            .createHttpRequest({
                method: 'DELETE',
                url,
                headers,
                isAuthRequire,
            })
            .then(httpClient.handleResponse<T>);
        return data;
    },
    patch<T>({ url, headers, body, isAuthRequire }: requestOption): Promise<T> {
        const data = httpClient
            .createHttpRequest({
                method: 'PATCH',
                url,
                headers,
                body,
                isAuthRequire,
            })
            .then(httpClient.handleResponse<T>);
        return data;
    },
};

export { httpRequest };
