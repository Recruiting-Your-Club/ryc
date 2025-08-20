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

export const usePostApplicationAnswers = ({
    announcementId,
    onSuccess,
    onError,
}: UsePostApplicationAnswersProps) => {
    return useMutation({
        mutationFn: (data: ApplicationSubmissionRequest) =>
            postApplicationAnswers(announcementId, data),
        onSuccess,
        onError,
    });
};
