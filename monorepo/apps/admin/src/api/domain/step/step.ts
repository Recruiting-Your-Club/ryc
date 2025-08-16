import { httpRequest } from '@api/common/httpRequest';

import type { Step, StepApplicant } from './types';

async function getTotalSteps(): Promise<Step> {
    const response = await httpRequest.get({
        url: 'step/all',
    });
    return response as Step;
}

async function getAllStepApplicants({
    announcementId,
    clubId,
}: {
    announcementId: string;
    clubId: string;
}): Promise<StepApplicant[]> {
    return await httpRequest.get({
        url: `announcements/${announcementId}/applications`,
        headers: {
            'X-CLUB-ID': clubId,
        },
    });
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
