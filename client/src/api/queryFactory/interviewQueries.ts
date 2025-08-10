import {
    getAllInterviewees,
    getAllInterviewSchedules,
    getEvaluation,
    getIntervieweeDetail,
    getInterviewInformation,
    getInterviewSlot,
    getUnreservedApplicant,
    updateIntervieweeSchedule,
} from '@api/domain/interview/interview';
import { queryOptions } from '@tanstack/react-query';
import { interviewKeys } from '../querykeyFactory';

const interviewQueries = {
    getIntervieweeDetail: (id: number) =>
        queryOptions({
            queryKey: interviewKeys.intervieweeDetail(id),
            queryFn: () => getIntervieweeDetail(id),
        }),
    allInterviewees: () =>
        queryOptions({
            queryKey: interviewKeys.allInterviewees,
            queryFn: () => getAllInterviewees(),
        }),
    allInterviewSchedules: () =>
        queryOptions({
            queryKey: interviewKeys.allInterviewSchedules,
            queryFn: () => getAllInterviewSchedules(),
        }),
    getInterviewEvaluation: (id: number) =>
        queryOptions({
            queryKey: interviewKeys.evaluationDetail(id),
            queryFn: () => getEvaluation(id),
        }),
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
};

export { interviewQueries };
