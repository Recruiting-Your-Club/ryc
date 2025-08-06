import { updateStepApplicantsStatus } from '@api/domain';
import { useMutation } from '@tanstack/react-query';

export const stepMutations = {
    useUpdateStepApplicantStatus: () => {
        return useMutation({
            mutationFn: (params: { applicantId: string; status: string }) =>
                updateStepApplicantsStatus(params),
        });
    },
};
