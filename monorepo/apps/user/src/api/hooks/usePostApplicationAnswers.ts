import { postApplicationAnswers } from '@api/domain/announcement/announcement';
import type {
    ApplicationSubmissionRequest,
    ApplicationSubmissionResponse,
} from '@api/domain/announcement/types';
import { useMutation } from '@tanstack/react-query';

interface UsePostApplicationAnswersProps {
    announcementId: string;
    onSuccess?: (response: ApplicationSubmissionResponse) => void;
    onError?: (error: Error) => void;
}

type SubmitVariables = {
    data: ApplicationSubmissionRequest;
    verifyCode: string;
};

export const usePostApplicationAnswers = ({
    announcementId,
    onSuccess,
    onError,
}: UsePostApplicationAnswersProps) => {
    return useMutation({
        mutationFn: ({ data, verifyCode }: SubmitVariables) =>
            postApplicationAnswers(announcementId, data, verifyCode),
        onSuccess,
        onError,
    });
};
