import {
    getAllEvaluations,
    getAllInterviewees,
    getAllInterviewSchedules,
} from '@api/domain/interview/interview';
import { queryOptions } from '@tanstack/react-query';
import { interviewKeys } from '../querykeyFactory';

const interviewQueries = {
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
    allInterviewEvaluations: () =>
        queryOptions({
            queryKey: interviewKeys.allEvaluations,
            queryFn: () => getAllEvaluations(),
        }),
};

export { interviewQueries };
