import { getAllStepApplicants, getTotalSteps } from '@api/domain';
import { stepKeys } from '@api/querykeyFactory';
import { queryOptions } from '@tanstack/react-query';

const stepQueries = {
    getTotalSteps: () =>
        queryOptions({
            queryKey: stepKeys.totalSteps,
            queryFn: () => getTotalSteps(),
        }),
    allStepApplicants: () =>
        queryOptions({
            queryKey: stepKeys.allStepApplicants,
            queryFn: () => getAllStepApplicants(),
        }),
};

export { stepQueries };
