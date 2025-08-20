import { createClub } from '@api/domain';
import type { CreateClub, CreateClubResponse } from '@api/domain/club/types';
import { clubKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateClub = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (club: CreateClub) => createClub(club),
        onSuccess: (response: CreateClubResponse) => {
            queryClient.setQueryData(clubKeys.create(response.clubId), response);
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
export { useCreateClub };
