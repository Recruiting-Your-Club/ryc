import { updateClub } from '@api/domain';
import type { Club } from '@api/domain/club/types';
import { myClubKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateClub = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, club }: { id: string; club: Club }) => updateClub(id, club),
        onSuccess: (response, { id }) => {
            queryClient.invalidateQueries({ queryKey: myClubKeys.detail(id) });
            return response;
        },
        onError: (error) => {
            console.error(error);
        },
    });
};

export { useUpdateClub };
