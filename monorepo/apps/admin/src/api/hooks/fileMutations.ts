import { HttpError } from '@api/common/httpError';
import { postIdAndGetFileDownloadUrl } from '@api/domain/file/file';
import { useMutation } from '@tanstack/react-query';

export const fileMutations = {
    usePostIdAndGetFileDownloadUrl: () => {
        return useMutation({
            mutationFn: postIdAndGetFileDownloadUrl,
            onSuccess: (data) => {},
            onError: (error) => {
                if (error instanceof HttpError && error.statusCode === 500) {
                    return;
                }
                throw error;
            },
        });
    },
};
