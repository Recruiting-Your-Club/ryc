import { submitInterviewReservation } from '@api/domain/club/club';
import { clubKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpError } from '../common/httpError';
import type { InterviewReservationParams } from './types';

const useSubmitInterviewReservation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            clubId = '',
            announcementId = '',
            applicantId = '',
            slotId = '',
        }: InterviewReservationParams) => submitInterviewReservation(slotId, applicantId),
        onSuccess: (response) => {
            return response;
        },
        onError: (
            error,
            { clubId = '', announcementId = '', applicantId = '' }: InterviewReservationParams,
        ) => {
            // 500 에러인 경우 전역 처리에 위임 (콘솔 로깅은 제외)
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            queryClient.invalidateQueries({
                queryKey: clubKeys.reservation(clubId, announcementId, applicantId),
            });
            console.error(error);
        },
    });
};

export { useSubmitInterviewReservation };
