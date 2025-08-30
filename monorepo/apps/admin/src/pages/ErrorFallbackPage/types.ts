export interface ErrorFallbackPageProps {
    error: ErrorWithStatusCode;
    resetErrorBoundary: () => void;
}

export interface ErrorWithStatusCode extends Error {
    statusCode: number;
    response?: {
        errors: ErrorResponse[];
    };
}

export interface ErrorResponse {
    code: string;
    message: string;
}
