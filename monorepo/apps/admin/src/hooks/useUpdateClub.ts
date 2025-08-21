import { updateClub } from '@api/domain';
import type { Club, UpdateClub } from '@api/domain/club/types';
import { clubKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateClub = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, club }: { id: string; club: UpdateClub }) => updateClub(id, club),
        onSuccess: (response, { id }) => {
            //서버에서 받은 response를 데이터로 직접 업데이트
            queryClient.setQueryData(clubKeys.detail(id), response);
            return response;
        },
        onError: (error) => {
            console.error(error);
        },
    });
};

export { useUpdateClub };
