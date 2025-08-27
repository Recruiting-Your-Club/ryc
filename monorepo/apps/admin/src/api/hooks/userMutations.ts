import { updateMyInformation } from '@api/domain/auth/auth';
import type { MyInformation } from '@api/domain/auth/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '../querykeyFactory';

interface UseAdminMutationParams {
    representativeImage: string | null;
    onSuccess?: (data: MyInformation) => void;
    onError?: (error: unknown) => void;
}

export function useUserMutation({
    onSuccess,
    onError,
}: Omit<UseAdminMutationParams, 'representativeImage'> = {}) {
    const queryClient = useQueryClient();

    const { mutate: updateUserInfo } = useMutation<
        MyInformation,
        Error,
        { representativeImage: string | null }
    >({
        mutationFn: updateMyInformation,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: userKeys.myInformation() });
            onSuccess?.(data);
        },
        onError,
    });

    return {
        updateUserInfo,
    };
}
