export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    name: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterResponse {
    message: string;
}