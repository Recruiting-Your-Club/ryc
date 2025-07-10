import {
    getAllDocuments,
    getAllEvaluations,
    getAllInterviewees,
    getAllInterviewSchedules,
    getIntervieweeDetail,
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
    allDocuments: () =>
        queryOptions({
            queryKey: interviewKeys.allDocuments,
            queryFn: () => getAllDocuments(),
        }),
    allInterviewEvaluations: () =>
        queryOptions({
            queryKey: interviewKeys.allEvaluations,
            queryFn: () => getAllEvaluations(),
        }),
};

export { interviewQueries };
