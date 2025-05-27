import { queryOptions, useQueries } from '@tanstack/react-query';
import { clubKeys } from '../querykeyFactory';
import { getAllClubs } from '@api/domain/club/club';

const clubQueries = {
    all: () =>
        queryOptions({
            queryKey: clubKeys.all,
            queryFn: () => getAllClubs(),
        }),
};
