export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface CreateClientOptions {
    url: string;
    method: HttpMethod;
    headers?: HeadersInit;
    body?: object;
    isAuthRequire?: boolean;
}

export type RequestOption = Omit<CreateClientOptions, 'method'>;
