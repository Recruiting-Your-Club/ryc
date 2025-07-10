import type { Interviewee } from '@api/domain/interview/types';

export const getInitialId = (intervieweelist: Interviewee[]) => {
    const earliestInterviewSetId = intervieweelist.reduce<number | null>((minId, applicant) => {
        return minId === null || applicant.interviewSetId < minId
            ? applicant.interviewSetId
            : minId;
    }, null);

    const earliestApplicantId = intervieweelist.reduce<number | null>((minId, applicant) => {
        if (applicant.interviewSetId === earliestInterviewSetId) {
            return minId === null || applicant.id < minId ? applicant.id : minId;
        }
        return minId;
    }, null);

    return earliestApplicantId;
};
