import { getClub, getDetailClub, getMyClub, updateClub } from '@api/domain';
import { clubKeys } from '@api/querykeyFactory';
import { DEFAULT_STALETIME } from '@constants/staleTime';
import { queryOptions } from '@tanstack/react-query';

const myClubQueries = {
    all: () =>
        queryOptions({
            queryKey: clubKeys.all,
            queryFn: () => getMyClub(),
            staleTime: DEFAULT_STALETIME,
        }),
    detail: (clubId: string) =>
        queryOptions({
            queryKey: clubKeys.detail(clubId),
            queryFn: () => getDetailClub(clubId),
            staleTime: DEFAULT_STALETIME,
        }),
    getClub: (id: string) =>
        queryOptions({
            queryKey: clubKeys.detail(id),
            queryFn: () => getClub(id),
        }),
};

export { myClubQueries };
