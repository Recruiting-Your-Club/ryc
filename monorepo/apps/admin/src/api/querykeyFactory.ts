/** 예시입니다. 나중에 지울게용
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}

queryClient.removeQueries({
  queryKey: todoKeys.all
})

// 🚀 invalidate all the lists
queryClient.invalidateQueries({
  queryKey: todoKeys.lists()
})

// 🙌 prefetch a single todo
queryClient.prefetchQueries({
  queryKey: todoKeys.detail(id),
  queryFn: () => fetchTodo(id),
})
*/
import type { EvaluationType } from './domain/evaluation/types';

const myClubKeys = {
    all: ['clubs'] as const,
};

const interviewKeys = {
    interviewSlot: (announcementId: string, clubId: string) =>
        ['interview-slot', announcementId, clubId] as const,
    interviewInformation: (announcementId: string, interviewSlotId: string, clubId: string) =>
        ['interview-information', announcementId, interviewSlotId, clubId] as const,
    unreservedApplicant: (announcementId: string, clubId: string) =>
        ['unreserved-applicant', announcementId, clubId] as const,
};

const applicantKeys = {
    applicantDocument: (announcementId: string, applicantId: string, clubId: string) =>
        ['applicant-document', announcementId, applicantId, clubId] as const,
};

const stepKeys = {
    totalSteps: (announcementId: string) => ['step', announcementId] as const,
    allStepApplicants: (announcementId: string, clubId: string) =>
        ['step-applicants', announcementId, clubId] as const,
};

const evaluationKeys = {
    evaluationSummary: (clubId: string, applicantIds: string[], type: EvaluationType) =>
        ['evaluation-summary', clubId, ...applicantIds, type] as const,
    evaluationDetail: (clubId: string, applicantIds: string[], type: EvaluationType) =>
        ['evaluation-detail', clubId, ...applicantIds, type] as const,
    myEvaluationStatus: (clubId: string, type: EvaluationType) =>
        ['my-evaluation-status', clubId, type] as const,
};

export { myClubKeys, interviewKeys, applicantKeys, stepKeys, evaluationKeys };
