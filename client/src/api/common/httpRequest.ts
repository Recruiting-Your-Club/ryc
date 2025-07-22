import { useAuthStore } from '@stores/authStore';
import { httpClient } from './httpClient';
import { HttpError } from './httpError';
import type { RequestBodyOption, RequestWithoutBodyOption } from './types';
import type { HttpMethod } from './types';

const httpRequest = {
    async request<T>(
        method: HttpMethod,
        option: RequestBodyOption | RequestWithoutBodyOption
    ): Promise<T>{
        const attempt = async (): Promise<T> => {
            const response = await httpClient.createHttpRequest({
                method,
                ...option,
            });

            return httpClient.handleResponse<T>(response)
        };

        try{
            return await attempt();
        } catch (error) {
            if(error instanceof HttpError && error.statusCode === 401){
                //silent refresh (access Token 재발급 시도)
                const newToken = await useAuthStore.getState().bootstrap();
                if(newToken){
                    //재시도
                    return await attempt();
                }
            }
            throw error;
        }
    },

    get<T>({ url, headers, isAuthRequire }: RequestWithoutBodyOption): Promise<T> {
        return this.request('GET', { url, headers, isAuthRequire });
    },
    post<T>({ url, headers, body, isAuthRequire }: RequestBodyOption): Promise<T> {
        return this.request('POST', { url, headers, body, isAuthRequire });
    },
    put<T>({ url, headers, body, isAuthRequire }: RequestBodyOption): Promise<T> {
        return this.request('PUT', { url, headers, body, isAuthRequire });
    },
    delete<T>({ url, headers, isAuthRequire }: RequestWithoutBodyOption): Promise<T> {
        return this.request('DELETE', { url, headers, isAuthRequire });
    },
    patch<T>({ url, headers, body, isAuthRequire }: RequestBodyOption): Promise<T> {
        return this.request('PATCH', { url, headers, body, isAuthRequire });
    },
}

export { httpRequest };
