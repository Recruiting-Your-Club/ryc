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

export { myClubKeys, interviewKeys };
