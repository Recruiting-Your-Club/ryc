import { getMyClub } from '@api/domain';
import { myClubKeys } from '@api/querykeyFactory';
import { DEFAULT_STALETIME } from '@constants/staleTime';
import { queryOptions } from '@tanstack/react-query';

const myClubQueries = {
    all: () =>
        queryOptions({
            queryKey: myClubKeys.all,
            queryFn: () => getMyClub(),
            staleTime: DEFAULT_STALETIME,
        }),
};

export { myClubQueries };
