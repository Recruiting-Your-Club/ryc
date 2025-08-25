import { queryOptions } from '@tanstack/react-query';

import { getClubMemberList } from '../domain/role/role';

const roleQueries = {
    getClubMemberList: (clubId: string) =>
        queryOptions({
            queryKey: ['clubMemberList', clubId],
            queryFn: () => getClubMemberList({ clubId }),
        }),
};

export { roleQueries };
