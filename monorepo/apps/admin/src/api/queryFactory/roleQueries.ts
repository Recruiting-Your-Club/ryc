import { queryOptions } from '@tanstack/react-query';

import { getClubInfoByInviteCode, getClubMemberList } from '../domain/role/role';

const roleQueries = {
    getClubMemberList: (clubId: string) =>
        queryOptions({
            queryKey: ['clubMemberList', clubId],
            queryFn: () => getClubMemberList({ clubId }),
        }),
    getClubInfoByInviteCode: (inviteCode: string) =>
        queryOptions({
            queryKey: ['clubInfoByInviteCode', inviteCode],
            queryFn: () => getClubInfoByInviteCode({ inviteCode }),
        }),
};

export { roleQueries };
