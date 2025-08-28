import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';

export interface ErrorDialogProps {
    open: boolean;
    handleClose: () => void;
    error: ErrorWithStatusCode;
    content?: string;
    subContent?: string;
}
