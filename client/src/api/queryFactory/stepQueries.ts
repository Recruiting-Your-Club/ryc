import { getAllStepApplicants, getTotalSteps } from '@api/domain';
import type { StepApplicant } from '@api/domain/step/types';
import { stepKeys } from '@api/querykeyFactory';
import { queryOptions } from '@tanstack/react-query';

const stepQueries = {
    getTotalSteps: (announcementId: string) =>
        queryOptions({
            queryKey: stepKeys.totalSteps(announcementId),
            queryFn: () => getTotalSteps({ announcementId }),
        }),
    allStepApplicants: (announcementId: string, clubId: string) =>
        queryOptions<StepApplicant[]>({
            queryKey: stepKeys.allStepApplicants(announcementId, clubId),
            queryFn: () => getAllStepApplicants({ announcementId, clubId }),
        }),
};

export { stepQueries };
