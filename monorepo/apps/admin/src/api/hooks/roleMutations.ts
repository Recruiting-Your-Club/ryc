import { deleteClubMember, postClubIdAndGetInviteUrl, postInviteCode } from '@api/domain/role/role';
import type { EnrollmentClubResponse, InvitesResponse } from '@api/domain/role/types';
import { useMutation } from '@tanstack/react-query';

interface PostClubIdAndGetInviteUrlParams {
    clubId: string;
    onSuccess?: (response: InvitesResponse) => void;
    onError?: (error: Error) => void;
}

interface PostInviteCodeParams {
    clubId: string;
    inviteCode: string;
    onSuccess?: (response: EnrollmentClubResponse) => void;
    onError?: (error: Error) => void;
}

export const roleMutations = {
    useDeleteClubMember: (clubId: string) => {
        return useMutation({
            mutationFn: (userId: string) => deleteClubMember({ clubId, userId }),
        });
    },

    // 초대 URL 생성
    usePostClubIdAndGetInviteUrl: ({
        clubId,
        onSuccess,
        onError,
    }: PostClubIdAndGetInviteUrlParams) => {
        return useMutation({
            mutationFn: () => postClubIdAndGetInviteUrl({ clubId }),
            onSuccess,
            onError,
        });
    },

    // 초대 코드로 멤버 추가
    usePostInviteCode: ({ clubId, inviteCode, onSuccess, onError }: PostInviteCodeParams) => {
        return useMutation({
            mutationFn: () => postInviteCode({ clubId, inviteCode }),
            onSuccess,
            onError,
        });
    },
};
