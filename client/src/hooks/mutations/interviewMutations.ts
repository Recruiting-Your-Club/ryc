import { patchInterviewReservation } from '@api/domain';
import { interviewKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchInterviewReservation {
    reservationId: string;
    interviewSlotId: string;
    clubId: string;
}

const interviewMutations = {
    useUpdateInterviewReservation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: PatchInterviewReservation) => patchInterviewReservation(params),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: interviewKeys.interviewInformation(
                        variables.reservationId,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                });
            },
        });
    },
};

export { interviewMutations };
