import {
    getAllInterviewees,
    getAllInterviewSchedules,
    getEvaluation,
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
    getInterviewEvaluation: (id: number) =>
        queryOptions({
            queryKey: interviewKeys.evaluationDetail(id),
            queryFn: () => getEvaluation(id),
        }),
};

export { interviewQueries };
