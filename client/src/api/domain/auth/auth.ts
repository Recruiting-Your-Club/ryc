import { httpRequest } from "@api/common/httpRequest";
import { Login, LoginResponse, Register, RegisterResponse } from "./types";

async function login(data: Login): Promise<LoginResponse>{
    return httpRequest.post({
        url: '/auth/login',
        body: data,
        isAuthRequire: false,
    })
}

async function register(data: Register): Promise<RegisterResponse>{
    return httpRequest.post({
        url: '/auth/register',
        body: data,
        isAuthRequire: false,
    })
}

export {login, register}