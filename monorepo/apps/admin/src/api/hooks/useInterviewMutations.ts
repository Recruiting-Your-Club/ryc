import { deleteInterviewReservation, putInterviewReservation } from '@api/domain';
import type { UnreservedApplicant } from '@api/domain/interview/types';
import { type InterviewApplicant } from '@api/domain/interview/types';
import { interviewKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@ssoc/ui';

interface PatchInterviewReservation {
    applicantId: string;
    interviewSlotId: string;
    clubId: string;
    oldInterviewSlotId: string;
}

interface DeleteInterviewReservation {
    reservationId: string;
    clubId: string;
    oldInterviewSlotId: string;
}

export const useInterviewMutations = {
    useUpdateInterviewReservation: (announcementId: string) => {
        const queryClient = useQueryClient();
        const { toast } = useToast();

        return useMutation({
            mutationFn: (params: PatchInterviewReservation) => putInterviewReservation(params),
            onMutate: async (variables) => {
                await queryClient.cancelQueries({
                    queryKey: interviewKeys.interviewInformation(
                        announcementId,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                });

                const prevOldSlot =
                    variables.oldInterviewSlotId === ''
                        ? queryClient.getQueryData<UnreservedApplicant[]>(
                              interviewKeys.unreservedApplicant(announcementId, variables.clubId),
                          )
                        : queryClient.getQueryData<InterviewApplicant[]>(
                              interviewKeys.interviewInformation(
                                  announcementId,
                                  variables.oldInterviewSlotId,
                                  variables.clubId,
                              ),
                          );

                const prevNewSlot = queryClient.getQueryData<InterviewApplicant[]>(
                    interviewKeys.interviewInformation(
                        announcementId,
                        variables.interviewSlotId,
                        variables.clubId,
                    ),
                );

                const getApplicantId = (applicant: InterviewApplicant | UnreservedApplicant) =>
                    'applicantSummary' in applicant
                        ? applicant.applicantSummary.applicantId
                        : applicant.applicantId;

                const movedApplicant = prevOldSlot?.find(
                    (applicant) => getApplicantId(applicant) === variables.applicantId,
                );

                if (!movedApplicant) return { prevOldSlot, prevNewSlot };

                const updateSlot = (
                    slotId: string,
                    updater: (slot: InterviewApplicant[]) => InterviewApplicant[],
                ) => {
                    queryClient.setQueryData<InterviewApplicant[]>(
                        interviewKeys.interviewInformation(
                            announcementId,
                            slotId,
                            variables.clubId,
                        ),
                        (oldData) => (oldData ? updater(oldData) : oldData),
                    );
                };

                updateSlot(variables.interviewSlotId, (slot) => [
                    ...slot,
                    movedApplicant as InterviewApplicant,
                ]);

                if (variables.oldInterviewSlotId !== '') {
                    updateSlot(variables.oldInterviewSlotId, (slot) =>
                        slot.filter(
                            (interviewee) =>
                                interviewee.applicantSummary.applicantId !== variables.applicantId,
                        ),
                    );
                } else {
                    queryClient.setQueryData<UnreservedApplicant[]>(
                        interviewKeys.unreservedApplicant(announcementId, variables.clubId),
                        (oldData) =>
                            oldData
                                ? oldData.filter(
                                      (applicant) =>
                                          applicant.applicantId !== variables.applicantId,
                                  )
                                : oldData,
                    );
                }

                return { prevOldSlot, prevNewSlot };
            },

            onError: (_, variables, context) => {
                if (context?.prevOldSlot) {
                    queryClient.setQueryData(
                        variables.oldInterviewSlotId === ''
                            ? interviewKeys.unreservedApplicant(announcementId, variables.clubId)
                            : interviewKeys.interviewInformation(
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
                toast('오류로 인해 일정 변경을 못했어요.', {
                    toastTheme: 'colored',
                    type: 'error',
                });
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
                    queryKey:
                        variables.oldInterviewSlotId === ''
                            ? interviewKeys.unreservedApplicant(announcementId, variables.clubId)
                            : interviewKeys.interviewInformation(
                                  announcementId,
                                  variables.oldInterviewSlotId,
                                  variables.clubId,
                              ),
                });
            },
        });
    },

    useDeleteReservation: (announcementId: string) => {
        const queryClient = useQueryClient();
        const { toast } = useToast();

        return useMutation({
            mutationFn: (params: DeleteInterviewReservation) => deleteInterviewReservation(params),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: interviewKeys.interviewInformation(
                        announcementId,
                        variables.oldInterviewSlotId,
                        variables.clubId,
                    ),
                });

                queryClient.invalidateQueries({
                    queryKey: interviewKeys.unreservedApplicant(announcementId, variables.clubId),
                });
            },
            onError: () => {
                toast('오류로 인해 일정 변경을 못했어요.', {
                    toastTheme: 'colored',
                    type: 'error',
                });
            },
        });
    },
};
