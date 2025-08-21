import { updateStepApplicantsStatus } from '@api/domain';
import { useMutation } from '@tanstack/react-query';

export const useStepMutations = {
    useUpdateStepApplicantStatus: () => {
        return useMutation({
            mutationFn: (params: { applicantId: string; status: string; clubId: string }) =>
                updateStepApplicantsStatus(params),
        });
    },
};
