import { httpRequest } from '@api/common/httpRequest';
import type { Step, StepApplicant } from './types';

async function getTotalSteps(): Promise<Step> {
    const response = await httpRequest.get({
        url: 'step/all',
    });
    return response as Step;
}
async function getAllStepApplicants(): Promise<StepApplicant[]> {
    const response = await httpRequest.get({
        url: 'step-applicants/all',
    });
    return response as StepApplicant[];
}

export { getTotalSteps, getAllStepApplicants };
