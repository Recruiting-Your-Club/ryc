import type {
    Evaluation,
    EvaluationDataWithSummary,
    EvaluationSummary,
} from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';
import { INITIAL_EVALUATION_SUMMARY } from '@constants/stepManagementPage';

export const getEvaluations = (
    detail: Evaluation | undefined,
    applicantId: string | undefined,
): EvaluationDataWithSummary =>
    detail?.evaluationsByApplicant?.[applicantId ?? ''] ?? INITIAL_EVALUATION_SUMMARY;

export const mergeApplicantWithSummary = (
    applicants: StepApplicant[],
    documentSummaries: EvaluationSummary[],
    interviewSummaries: EvaluationSummary[],
    isThreeStepProcess: boolean,
) => {
    return applicants.map((applicant) => {
        const isDocumentStep =
            applicant.status === 'DOCUMENT_PASS' ||
            applicant.status === 'DOCUMENT_FAIL' ||
            (!isThreeStepProcess && ['FINAL_PASS', 'FINAL_FAIL'].includes(applicant.status));

        const summaryList = isDocumentStep ? documentSummaries : interviewSummaries;

        const summary = summaryList.find(
            (summary) => summary.applicantId === applicant.applicantId,
        );

        return {
            ...applicant,
            completedEvaluatorCount: summary?.completedEvaluatorCount ?? 0,
            totalEvaluatorCount: summary?.totalEvaluatorCount ?? 0,
            averageScore: summary?.averageScore ?? 0,
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
        documentPassed: [] as typeof applicants,
        documentFailed: [] as typeof applicants,
        finalPassed: [] as typeof applicants,
        finalFailed: [] as typeof applicants,
        ...(isThreeStepProcess && {
            interviewPassed: [] as typeof applicants,
            interviewFailed: [] as typeof applicants,
        }),
    };

    for (const applicant of applicants) {
        switch (applicant.status) {
            case 'DOCUMENT_PASS':
                grouped.documentPassed.push(applicant);
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
            case 'INTERVIEW_PASS':
                if (isThreeStepProcess) grouped.interviewPassed?.push(applicant);
                break;
            case 'INTERVIEW_FAIL':
                if (isThreeStepProcess) grouped.interviewFailed?.push(applicant);
                break;
        }
    }

    return grouped;
};
