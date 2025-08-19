import { deleteClubMember, postClubIdAndGetInviteUrl, postInviteCode } from '@api/domain/role/role';
import { useMutation } from '@tanstack/react-query';

export const roleMutations = {
    // 멤버 삭제 (내보내기)
    useDeleteClubMember: (clubId: string) => {
        return useMutation({
            mutationFn: (userId: string) => deleteClubMember({ clubId, userId }),
            //onSuccess: () => {
            //},
        });
    },

    // 초대 URL 생성
    usePostClubIdAndGetInviteUrl: (clubId: string) => {
        return useMutation({
            mutationFn: () => postClubIdAndGetInviteUrl({ clubId }),
        });
    },

    // 초대 코드로 멤버 추가
    usePostInviteCode: (clubId: string) => {
        return useMutation({
            mutationFn: (inviteCode: string) => postInviteCode({ clubId, inviteCode }),
            // onSuccess: () => {

            // },
        });
    },
};
