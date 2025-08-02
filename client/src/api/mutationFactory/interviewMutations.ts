import { updateIntervieweeSchedule } from '@api/domain';
import { interviewKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
};

export { interviewMutations };
