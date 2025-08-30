import {
    ERROR_CODE_400,
    ERROR_CODE_401,
    ERROR_CODE_403,
    ERROR_CODE_404_DATA,
    ERROR_CODE_500,
    ERROR_DEFAULT,
} from '@constants/errorText';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';

export const getErrorMessage = (error: ErrorWithStatusCode): string => {
    switch (error.statusCode) {
        case 500:
            return ERROR_CODE_500;
        case 404:
            return ERROR_CODE_404_DATA;
        case 403:
            return ERROR_CODE_403;
        case 401:
            return ERROR_CODE_401;
        case 400:
            if (
                error.response?.errors &&
                Array.isArray(error.response.errors) &&
                error.response.errors.length > 0
            ) {
                return error.response.errors[0].message;
            }
            return error.message ? `${error.message} (400)` : ERROR_CODE_400;
        default:
            return error.message ?? ERROR_DEFAULT;
    }
};

export const getErrorPlainMessageByErrorStatusCode = (errorStatusCode: number): string => {
    switch (errorStatusCode) {
        case 500:
            return ERROR_CODE_500;
        case 404:
            return ERROR_CODE_404_DATA;
        case 403:
            return ERROR_CODE_403;
        case 401:
            return ERROR_CODE_401;
        case 400:
            return ERROR_CODE_400;
        default:
            return ERROR_DEFAULT;
    }
};
