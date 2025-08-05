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

async function updateStepApplicantsStatus({
    applicantId,
    status,
}: {
    applicantId: string;
    status: string;
}): Promise<void> {
    await httpRequest.patch({
        url: `step-applicants/${applicantId}/status`,
        body: { status },
    });
}

export { getTotalSteps, getAllStepApplicants, updateStepApplicantsStatus };
