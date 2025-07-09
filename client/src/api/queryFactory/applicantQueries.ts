import { getAllInterviewees, getAllInterviewSchedules } from '@api/domain/applicant/applicant';
import { queryOptions } from '@tanstack/react-query';
import { applicantKeys } from '../querykeyFactory';

const applicantQueries = {
    allInterviewees: () =>
        queryOptions({
            queryKey: applicantKeys.allInterviewees,
            queryFn: () => getAllInterviewees(),
        }),
    allInterviewSchedules: () =>
        queryOptions({
            queryKey: applicantKeys.allInterviewSchedules,
            queryFn: () => getAllInterviewSchedules(),
        }),
};

export { applicantQueries };
