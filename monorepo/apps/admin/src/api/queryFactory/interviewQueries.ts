import {
    getAllInterviewees,
    getAllInterviewSchedules,
    getDocument,
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
    getDocument: (id: number) =>
        queryOptions({
            queryKey: interviewKeys.documentDetail(id),
            queryFn: () => getDocument(id),
        }),
    getInterviewEvaluation: (id: number) =>
        queryOptions({
            queryKey: interviewKeys.evaluationDetail(id),
            queryFn: () => getEvaluation(id),
        }),
};

export { interviewQueries };
