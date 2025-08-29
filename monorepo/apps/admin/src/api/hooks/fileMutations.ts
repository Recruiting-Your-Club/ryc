import { HttpError } from '@api/common/httpError';
import { postIdAndGetFileDownloadUrl } from '@api/domain/file/file';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { useMutation } from '@tanstack/react-query';
import { getErrorMessage } from '@utils/getErrorMessage';

import { useToast } from '@ssoc/ui';

export const fileMutations = {
    usePostIdAndGetFileDownloadUrl: () => {
        const { toast } = useToast();
        return useMutation({
            mutationFn: postIdAndGetFileDownloadUrl,
            onSuccess: (data) => {},
            onError: (error) => {
                // 500에러까지 한번에 처리 (dialog 불가)
                toast(getErrorMessage(error as ErrorWithStatusCode), {
                    toastTheme: 'colored',
                    type: 'error',
                });
                // throw error
            },
        });
    },
};
