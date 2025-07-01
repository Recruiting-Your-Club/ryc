export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface CreateClientOptions {
    url: string;
    method: HttpMethod;
    headers?: HeadersInit;
    body?: object;
    isAuthRequire?: boolean;
}

export type RequestBodyOption = Omit<CreateClientOptions, 'method'>;
export type RequestWithoutBodyOption = Omit<RequestBodyOption, 'body'>;

