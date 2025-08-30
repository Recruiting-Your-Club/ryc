export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    name: string;
    password: string;
    verifyCode: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterResponse {
    message: string;
}
export interface MyInformation {
    name: string;
    email: string;
    representativeImage: RepresentativeImage;
}
export interface RepresentativeImage {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}
export interface CheckDuplicateEmailResponse {
    duplicated: boolean;
}
