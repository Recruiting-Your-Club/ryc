export interface ErrorFallbackPageProps {
    error: ErrorWithStatusCode;
    resetErrorBoundary: () => void;
}

export interface ErrorWithStatusCode extends Error {
    statusCode?: number;
}
