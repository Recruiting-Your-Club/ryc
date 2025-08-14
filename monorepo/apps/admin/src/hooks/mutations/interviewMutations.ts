import { patchInterviewReservation } from '@api/domain';
import { interviewKeys } from '@api/querykeyFactory';
import { ANNOUNCEMENT_ID } from '@pages/ApplicantSchedulePage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchInterviewReservation {
    applicantId: string;
    interviewSlotId: string;
    clubId: string;
    oldInterviewSlotId: string;
}

const interviewMutations = {
    useUpdateInterviewReservation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: PatchInterviewReservation) => patchInterviewReservation(params),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: interviewKeys.interviewInformation(
                        ANNOUNCEMENT_ID,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                });

                if (variables.oldInterviewSlotId) {
                    queryClient.invalidateQueries({
                        queryKey: interviewKeys.interviewInformation(
                            ANNOUNCEMENT_ID,
                            variables.oldInterviewSlotId,
                            variables.clubId,
                        ),
                    });
                }
            },
        });
    },
};

export { interviewMutations };
