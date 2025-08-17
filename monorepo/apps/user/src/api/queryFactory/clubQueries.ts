import { getAllClubs, getClub, getClubReservation } from '@api/domain/club/club';
import { queryOptions } from '@tanstack/react-query';

import { clubKeys } from '../querykeyFactory';

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
    getClubReservation: (clubId: string, announcementId: string, applicantId: string) =>
        queryOptions({
            queryKey: clubKeys.reservation(clubId, announcementId, applicantId),
            queryFn: () => getClubReservation(clubId, announcementId, applicantId),
        }),
};
export { clubQueries };
