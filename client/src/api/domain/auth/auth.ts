import { httpRequest } from "@api/common/httpRequest";
import { Login, LoginResponse, Register, RegisterResponse } from "./types";

async function login(data: Login): Promise<LoginResponse>{
    const response = await httpRequest.post({
        url: 'auth/login',
        body: data,
        isAuthRequire: false,
    })
    return response as LoginResponse
}

async function register(data: Register): Promise<RegisterResponse>{
    const response = await httpRequest.post({
        url: 'auth/register',
        body: data,
        isAuthRequire: false,
    })
    return response as RegisterResponse;
}

export {login, register}