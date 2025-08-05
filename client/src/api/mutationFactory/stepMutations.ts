import { updateStepApplicantsStatus } from '@api/domain';
import { evaluationKeys, stepKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const stepMutations = {
    useUpdateStepApplicantStatus: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (params: { applicantId: string; status: string }) =>
                updateStepApplicantsStatus(params),
        });
    },
};
