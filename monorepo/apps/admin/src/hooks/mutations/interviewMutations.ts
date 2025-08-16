import { patchInterviewReservation } from '@api/domain';
import type { InterviewApplicant } from '@api/domain/interview/types';
import { interviewKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchInterviewReservation {
    applicantId: string;
    interviewSlotId: string;
    clubId: string;
    oldInterviewSlotId: string;
}

const interviewMutations = {
    useUpdateInterviewReservation: (announcementId: string) => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (params: PatchInterviewReservation) => patchInterviewReservation(params),
            onMutate: async (variables) => {
                await queryClient.cancelQueries({
                    queryKey: interviewKeys.interviewInformation(
                        announcementId,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                });

                const prevOldSlot = queryClient.getQueryData<InterviewApplicant>(
                    interviewKeys.interviewInformation(
                        announcementId,
                        variables.oldInterviewSlotId,
                        variables.clubId,
                    ),
                );

                const prevNewSlot = queryClient.getQueryData<InterviewApplicant>(
                    interviewKeys.interviewInformation(
                        announcementId,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                );

                const movedApplicant = prevOldSlot?.interviewReservations.find(
                    (interviewee) => interviewee.applicantId === variables.applicantId,
                );

                if (!movedApplicant) return { prevOldSlot, prevNewSlot };

                const updateSlot = (
                    slotId: string,
                    updater: (slot: InterviewApplicant) => InterviewApplicant,
                ) => {
                    queryClient.setQueryData<InterviewApplicant>(
                        interviewKeys.interviewInformation(
                            announcementId,
                            slotId,
                            variables.clubId,
                        ),
                        (oldData) => (oldData ? updater(oldData) : oldData),
                    );
                };

                updateSlot(variables.interviewSlotId, (slot) => ({
                    ...slot,
                    interviewReservations: [...slot.interviewReservations, movedApplicant],
                }));

                if (variables.oldInterviewSlotId) {
                    updateSlot(variables.oldInterviewSlotId, (slot) => ({
                        ...slot,
                        interviewReservations: slot.interviewReservations.filter(
                            (interviewee) => interviewee.applicantId !== variables.applicantId,
                        ),
                    }));
                }

                return { prevOldSlot, prevNewSlot };
            },

            onError: (_, variables, context) => {
                if (context?.prevOldSlot) {
                    queryClient.setQueryData(
                        interviewKeys.interviewInformation(
                            announcementId,
                            variables.oldInterviewSlotId,
                            variables.clubId,
                        ),
                        context.prevOldSlot,
                    );
                }
                if (context?.prevNewSlot) {
                    queryClient.setQueryData(
                        interviewKeys.interviewInformation(
                            announcementId,
                            variables.interviewSlotId,
                            variables.clubId,
                        ),
                        context.prevNewSlot,
                    );
                }
            },

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: interviewKeys.interviewInformation(
                        announcementId,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                });

                queryClient.invalidateQueries({
                    queryKey: interviewKeys.interviewInformation(
                        announcementId,
                        variables.oldInterviewSlotId,
                        variables.clubId,
                    ),
                });
            },
        });
    },
};

export { interviewMutations };
