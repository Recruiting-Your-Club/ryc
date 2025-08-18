import type {
    Evaluation,
    EvaluationDetailWithSummary,
    EvaluationSummary,
} from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';
import { INITIAL_EVALUATION_SUMMARY } from '@constants/stepManagementPage';

export const getEvaluations = (
    detail: Evaluation | undefined,
    applicantId: string | undefined,
): EvaluationDetailWithSummary =>
    detail?.evaluationsOfApplicants.find((e) => e.applicantId === applicantId) ??
    INITIAL_EVALUATION_SUMMARY;

export const mergeApplicantWithSummary = (
    applicants: StepApplicant[],
    documentSummaries: EvaluationSummary[],
    interviewSummaries: EvaluationSummary[],
    isThreeStepProcess: boolean,
) => {
    return applicants.map((applicant) => {
        const isDocumentStep =
            applicant.status === 'DOCUMENT_PENDING' ||
            applicant.status === 'DOCUMENT_FAIL' ||
            (!isThreeStepProcess && ['FINAL_PASS', 'FINAL_FAIL'].includes(applicant.status));

        const summaryList = isDocumentStep ? documentSummaries : interviewSummaries;

        const summary = summaryList.find(
            (summary) => summary.applicantId === applicant.applicantId,
        );

        let averageScore = summary?.averageScore ?? 0;

        if (isThreeStepProcess && ['FINAL_PASS', 'FINAL_FAIL'].includes(applicant.status)) {
            const documentSummary = documentSummaries.find(
                (summary) => summary.applicantId === applicant.applicantId,
            );
            const interviewSummary = interviewSummaries.find(
                (summary) => summary.applicantId === applicant.applicantId,
            );

            const documentScore = documentSummary?.averageScore ?? 0;
            const interviewScore = interviewSummary?.averageScore ?? 0;

            averageScore = (documentScore + interviewScore) / 2;
        }

        return {
            ...applicant,
            completedEvaluatorCount: summary?.completedEvaluatorCount ?? 0,
            totalEvaluatorCount: summary?.totalEvaluatorCount ?? 0,
            averageScore: averageScore,
        };
    });
};

export const groupStepApplicants = (
    applicants: (StepApplicant & {
        completedEvaluatorCount: number;
        totalEvaluatorCount: number;
        averageScore: number;
    })[],
    isThreeStepProcess: boolean,
) => {
    const grouped = {
        documentPending: [] as typeof applicants,
        documentFailed: [] as typeof applicants,
        finalPassed: [] as typeof applicants,
        finalFailed: [] as typeof applicants,
        ...(isThreeStepProcess && {
            interviewPending: [] as typeof applicants,
            interviewFailed: [] as typeof applicants,
        }),
    };

    for (const applicant of applicants) {
        switch (applicant.status) {
            case 'DOCUMENT_PENDING':
                grouped.documentPending.push(applicant);
                break;
            case 'DOCUMENT_FAIL':
                grouped.documentFailed.push(applicant);
                break;
            case 'FINAL_PASS':
                grouped.finalPassed.push(applicant);
                break;
            case 'FINAL_FAIL':
                grouped.finalFailed.push(applicant);
                break;
            case 'INTERVIEW_PENDING':
                if (isThreeStepProcess) grouped.interviewPending?.push(applicant);
                break;
            case 'INTERVIEW_FAIL':
                if (isThreeStepProcess) grouped.interviewFailed?.push(applicant);
                break;
        }
    }

    return grouped;
};
