import { httpRequest } from '@api/common/httpRequest';

import type { Step, StepApplicant } from './types';

async function getTotalSteps({ announcementId }: { announcementId: string }): Promise<Step> {
    const response = await httpRequest.get({
        url: `announcements/${announcementId}/process`,
        isAuthRequire: true,
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
        isAuthRequire: true,
    });
}

async function updateStepApplicantsStatus({
    applicantId,
    status,
    clubId,
}: {
    applicantId: string;
    status: string;
    clubId: string;
}): Promise<void> {
    await httpRequest.patch({
        url: `applicants/${applicantId}/status`,
        body: { status },
        headers: {
            'X-CLUB-ID': clubId,
        },
        isAuthRequire: true,
    });
}

export { getTotalSteps, getAllStepApplicants, updateStepApplicantsStatus };
