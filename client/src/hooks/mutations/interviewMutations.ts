import { patchInterviewReservation, updateIntervieweeSchedule } from '@api/domain';
import { interviewKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchInterviewReservation {
    reservationId: string;
    interviewSlotId: string;
    clubId: string;
}

const interviewMutations = {
    useUpdateIntervieweeSchedule: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                intervieweeId,
                body,
            }: {
                intervieweeId: number;
                body: { interviewSetId: number | null };
            }) => updateIntervieweeSchedule(intervieweeId, body),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: interviewKeys.allInterviewees });
            },
        });
    },

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
