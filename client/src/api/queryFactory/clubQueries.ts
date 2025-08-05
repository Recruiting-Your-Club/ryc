import { queryOptions } from '@tanstack/react-query';
import { clubKeys } from '../querykeyFactory';
import { getAllClubs, getClub, getMyClub } from '@api/domain/club/club';

const clubQueries = {
    all: () =>
        queryOptions({
            queryKey: clubKeys.all,
            queryFn: () => getAllClubs(),
        }),
    getClub: (id: string) =>
        queryOptions({
            queryKey: clubKeys.detail(id),
            queryFn: () => getClub(id),
        }),
    myClub: () =>
        queryOptions({
            queryKey: clubKeys.myClub,
            queryFn: () => getMyClub(),
        }),
};
export { clubQueries };
