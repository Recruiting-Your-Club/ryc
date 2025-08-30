import { submitInterviewReservation } from '@api/domain/club/club';
import { clubKeys } from '@api/querykeyFactory';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { returnErrorMessage } from '@utils/getErrorMessage';

import { useToast } from '@ssoc/ui';

import { HttpError } from '../common/httpError';
import type { InterviewReservationParams } from './types';

const useSubmitInterviewReservation = (onErrorDialogOpen: (open: boolean) => void) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

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
            err,
            { clubId = '', announcementId = '', applicantId = '' }: InterviewReservationParams,
        ) => {
            const error = err as ErrorWithStatusCode;
            if (error.statusCode === 500) {
                onErrorDialogOpen(true);
            } else if (error.response?.errors[0].message || error.message) {
                toast(returnErrorMessage(error), { type: 'error', toastTheme: 'colored' });
            } else {
                toast('오류로 인해 예약에 실패했어요.', {
                    toastTheme: 'colored',
                    type: 'error',
                });
            }
            queryClient.invalidateQueries({
                queryKey: clubKeys.reservation(clubId, announcementId, applicantId),
            });
            console.error(error);
        },
    });
};

export { useSubmitInterviewReservation };
