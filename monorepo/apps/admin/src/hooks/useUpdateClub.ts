import { updateClub } from '@api/domain';
import type { Club, UpdateClub } from '@api/domain/club/types';
import { clubKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HttpError } from '../api/common/httpError';

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
            // 500 에러인 경우 전역 처리에 위임 (콘솔 로깅은 제외)
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            console.error(error);
        },
    });
};

export { useUpdateClub };
