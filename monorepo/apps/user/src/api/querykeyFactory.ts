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
    reservation: (clubId: string, announcementId: string, applicantId: string) =>
        ['reservation', clubId, announcementId, applicantId] as const,
};

const applicationKeys = {
    all: ['application'] as const,
    detail: (id: string) => ['detail', id] as const,
};

const announcementKeys = {
    lists: (clubId: string) => ['list', clubId] as const,
    detail: (announcementId: string) => ['detail', announcementId] as const,
    postApplicationAnswers: (announcementId: string) =>
        ['post-application-answers', announcementId] as const,
};

export { clubKeys, applicationKeys, announcementKeys };
