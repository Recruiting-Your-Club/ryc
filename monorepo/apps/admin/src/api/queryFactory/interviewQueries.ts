import {
    getInterviewInformation,
    getInterviewReminder,
    getInterviewSlot,
    getUnreservedApplicant,
} from '@api/domain/interview/interview';
import { queryOptions } from '@tanstack/react-query';

import { interviewKeys } from '../querykeyFactory';

const interviewQueries = {
    interviewSlot: (announcementId: string, clubId: string) =>
        queryOptions({
            queryKey: interviewKeys.interviewSlot(announcementId, clubId),
            queryFn: () => getInterviewSlot({ announcementId, clubId }),
        }),
    interviewInformation: (announcementId: string, interviewSlotId: string, clubId: string) =>
        queryOptions({
            queryKey: interviewKeys.interviewInformation(announcementId, interviewSlotId, clubId),
            queryFn: () => getInterviewInformation({ announcementId, interviewSlotId, clubId }),
        }),
    unreservedApplicant: (announcementId: string, clubId: string) =>
        queryOptions({
            queryKey: interviewKeys.unreservedApplicant(announcementId, clubId),
            queryFn: () => getUnreservedApplicant({ announcementId, clubId }),
        }),
    interviewReminder: (announcementId: string, clubId: string) =>
        queryOptions({
            queryKey: interviewKeys.interviewReminder(announcementId, clubId),
            queryFn: () => getInterviewReminder({ announcementId, clubId }),
        }),
};

export { interviewQueries };
