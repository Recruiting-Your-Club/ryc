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

const clubKeys = {
    all: ['clubs'] as const,
    detail: (id: string) => ['detail', id] as const,
};

const applicantKeys = {
    applicantDocument: (announcementId: string, applicantId: string, clubId: string) =>
        ['applicant-document', announcementId, applicantId, clubId] as const,
};

const stepKeys = {
    totalSteps: ['step'] as const,
    allStepApplicants: (announcementId: string, clubId: string) =>
        ['step-applicants', announcementId, clubId] as const,
};

const evaluationKeys = {
    evaluationSummary: (clubId: string, applicantIds: string[], type: 'document' | 'interview') =>
        ['evaluation-summary', clubId, ...applicantIds, type] as const,
    evaluationDetail: (clubId: string, applicantIds: string[], type: 'document' | 'interview') =>
        ['evaluation-detail', clubId, ...applicantIds, type] as const,
    myEvaluationStatus: (
        clubId: string,
        applicantIds: string[],
        type: 'application' | 'interview',
    ) => ['my-evaluation-status', clubId, ...applicantIds, type] as const,
};

export { clubKeys, applicantKeys, stepKeys, evaluationKeys };
