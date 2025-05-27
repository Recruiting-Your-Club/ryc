type httpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface CreateClientOptions {
    url: string;
    method: httpMethod;
    headers?: HeadersInit;
    body?: object;
    isAuthRequire?: boolean;
}

export type requestOption = Omit<CreateClientOptions, 'method'>;
