import { httpRequest } from '@api/common/httpRequest';

import type { Login, LoginResponse, MyInformation, Register, RegisterResponse } from './types';

async function login(data: Login): Promise<LoginResponse> {
    const response = await httpRequest.post({
        url: 'auth/login',
        body: data,
        isAuthRequire: true,
    });
    return response as LoginResponse;
}

async function register(data: Register): Promise<RegisterResponse> {
    const response = await httpRequest.post({
        url: 'auth/register',
        body: data,
        isAuthRequire: false,
    });
    return response as RegisterResponse;
}

async function checkEmail(email: string): Promise<boolean> {
    const response = await httpRequest.get({
        url: `admin/emails/duplicate-check?email=${email}`,
        isAuthRequire: false,
    });
    return response as boolean;
}
async function myInformation(): Promise<MyInformation> {
    const response = await httpRequest.get({
        url: 'admin/me',
        isAuthRequire: true,
    });
    return response as MyInformation;
}

export { login, register, checkEmail, myInformation };
